import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import CircularProgress from 'material-ui/CircularProgress'

import colors from '../../common/constants/colors'
import {setLastViewedHistoryKey} from '../../common/actions/app'

import {db} from '../../common/firebase'

const PAGING = 20

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    tid: PropTypes.string,
    uid: PropTypes.string,
    // from parent component
    name: PropTypes.string.isRequired,
    renderRow: PropTypes.func.isRequired,
    style: PropTypes.object,
    orderBy: PropTypes.string,
    children: PropTypes.node,
    // action creators:
    setLastViewedHistoryKey: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      loading: false,
      empty: false,
    }
    this.ref = this.ref.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.lastEntry = this.lastEntry.bind(this)
    this.childAdded = this.childAdded.bind(this)
    this.childChanged = this.childChanged.bind(this)
    //this.childMoved = this.childMoved.bind(this)
    this.childRemoved = this.childRemoved.bind(this)
    this.flush = this.flush.bind(this)
    this.handleError = this.handleError.bind(this)
    this.queryRef = null
    this.last = null
  }

  componentDidMount() {
    if (this.props.tid) {
      this.tid = this.props.tid
      this.handleLoad()
    }
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillReceiveProps(props) {
    if (props.tid && !this.tid) {
      this.tid = props.tid
      this.handleLoad()
    }
  }

  componentWillUnmount() {
    if (this.queryRef) {
      this.queryRef.off('value', this.lastEntry)
      this.queryRef.off('child_added', this.childAdded)
      this.queryRef.off('child_changed', this.childChanged)
      //this.queryRef.off('child_moved', this.childMoved)
      this.queryRef.off('child_removed', this.childRemoved)
    }
    clearTimeout(this.timeout)
    window.removeEventListener('scroll', this.handleScroll)
  }

  ref(element) {
    this.element = element
  }

  handleScroll() {
    if (!this.element) {
      return
    }
    const atBottom = (document.body.scrollTop > this.element.scrollHeight - window.innerHeight)
    if (atBottom && this.tid) {
      this.handleLoad()
    }
  }

  handleLoad() {
    if (!this.queryRef) {
      this.queryRef = db.ref('tribes/' + this.tid + '/' + this.props.name)
    }

    let query
    if (this.props.orderBy) {
      query = this.queryRef.orderByChild(this.props.orderBy)
    } else {
      query = this.queryRef.orderByKey()
    }

    if (!this.listeningToLast) {
      query.limitToLast(2).on('value', this.lastEntry, this.handleError)
      this.listeningToLast = true
    }

    if (this.state.loading) {
      return // e.g. multiple scrollings
    }
    if (this.first && this.last === this.first) {
      return // already listening down to this index
    }
    this.setState({
      loading: true,
    })

    if (this.last) {
      query = query.endAt(this.last)
    }
    this.first = this.last // see below
    query.limitToLast(PAGING).on('child_added', this.childAdded, this.handleError)
    query.limitToLast(PAGING).on('child_changed', this.childChanged, this.handleError)
    //query.limitToLast(PAGING).on('child_moved', this.childMoved, this.handleError)
    query.limitToLast(PAGING).on('child_removed', this.childRemoved, this.handleError)
  }

  lastEntry(snapshot) {
    this.setState({
      empty: !snapshot.numChildren(),
    })
  }

  childAdded(snapshot) {
    clearTimeout(this.timeout)
    if (snapshot.key !== this.first) { // adjacent queries have a row in common (last of previous === first of current) => deduplicate it
      const item = snapshot.val()
      item.id = snapshot.key
      this.state.items.push(item) // add to state but without re-rendering (see batching below)
      if (!this.last || snapshot.key < this.last) {
        this.last = snapshot.key // i.e. the next query will include the last item of the current one
        // or:
        // const key = snapshot.key
        // this.last = key.substr(0, key.length - 1) + String.fromCharCode(key.substr(-1).charCodeAt() - 1) // replace last char with previous unicode one to not include the last item
      }
    }
    this.timeout = setTimeout(this.flush, 20) // the "child_added" events normally arrive in 1 to 5 ms
  }

  flush() {
    const sorter = this.props.orderBy || 'id'
    const items = this.state.items.sort((a, b) => (a[sorter] < b[sorter] ? 1 : -1))
    if (this.props.name === 'history') {
      if (!this.lastKey || items[0].id > this.lastKey) {
        this.lastKey = items[0].id
        this.props.setLastViewedHistoryKey(this.lastKey)
      }
    }
    this.setState({
      items,
      loading: false,
    })
  }

  childChanged(snapshot) {
    const newItem = snapshot.val()
    newItem.id = snapshot.key
    this.setState({
      items: this.state.items.map((item) => (item.id === snapshot.key ? newItem : item)),
    })
  }

  // childMoved() {
  //
  // }

  childRemoved(snapshot) {
    this.setState({
      items: this.state.items.filter((item) => item.id !== snapshot.key),
    })
  }

  handleError(error) {
    this.setState({
      error: 'firebase.error.' + error.code, //TODO
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>
            <FormattedMessage id={this.state.error} />
          </div>
        </div>
      )
    }

    if (this.state.empty) {
      return (
        <div style={styles.errorContainer}>empty.</div>
      )
    }

    return (
      <div style={this.props.style} ref={this.ref}>
        {
          this.state.items.map(this.props.renderRow)
        }
        {
          this.state.loading && (
            <div style={styles.loading}>
              <CircularProgress color={colors.main} size={0.5} style={{textAlign: 'center'}} />
            </div>
          )
        }
        {this.props.children}
      </div>
    )
  }
}

const styles = {
  errorContainer: {
    textAlign: 'center',
    padding: '40px 0',
  },
  errorText: {
    marginBottom: 20,
    color: 'red',
  },
  loading: {
    textAlign: 'center',
    padding: 20,
  },
}

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  uid: state.user.uid,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLastViewedHistoryKey,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AsyncContent)
