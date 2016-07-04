import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'

import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'

import colors from '../../common/constants/colors'

import {db} from '../../common/firebase'

const PAGING = 20

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    tid: PropTypes.string,
    // from parent component
    name: PropTypes.string.isRequired,
    renderRow: PropTypes.func.isRequired,
    style: PropTypes.object,
    children: PropTypes.node,
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
    this.childAdded = this.childAdded.bind(this)
    this.batchUpdate = this.batchUpdate.bind(this)
    this.handleError = this.handleError.bind(this)
    this.query = null
    this.last = null
    this.buffer = []
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
    if (this.query) {
      this.query.off()
    }
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
    if (atBottom) {
      this.handleLoad(true)
    }
  }

  handleLoad() {
    if (!this.query) {
      this.query = db.ref('tribes/' + this.tid + '/' + this.props.name).orderByKey()

      this.query.limitToLast(1).on('value', (snapshot) => {
        this.setState({
          empty: !snapshot.numChildren(),
        })
      }, this.handleError)
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

    const query = this.last ? this.query.endAt(this.last) : this.query
    this.first = this.last // see below
    query.limitToLast(PAGING).on('child_added', this.childAdded, this.handleError)
  }

  childAdded(snapshot) {
    this.setState({
      loading: false,
    })
    if (snapshot.key === this.first) {
      return // adjacent queries have a row in common (last of previous === first of current) => deduplicate it
    }
    clearTimeout(this.timeout)
    const item = snapshot.val()
    item.key = snapshot.key
    this.buffer.push(item)
    if (!this.last || snapshot.key < this.last) {
      this.last = snapshot.key // i.e. the next query will include the last item of the current one (which is )
    }
    this.timeout = setTimeout(this.batchUpdate, 20) // the "child_added" events normally arrive in 1 to 5 ms
  }

  batchUpdate() {
    this.setState({
      items: this.buffer.sort((a, b) => (a.key < b.key ? 1 : -1)),
    })
  }

  handleError(error) {
    this.setState({
      error: 'firebase.error.' + error.code,
    })
  }

  render() {
    if (this.state.error) {
      return (
        <div style={styles.errorContainer}>
          <div style={styles.errorText}>
            <FormattedMessage id={this.state.error} />
          </div>
          <RaisedButton label={<FormattedMessage id="retry" />} onTouchTap={this.handleLoad} />
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
  tid: state.tribe.key,
})

export default connect(mapStateToProps)(AsyncContent)
