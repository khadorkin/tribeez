import React, {Component, PropTypes} from 'react'
import {ActivityIndicator, StyleSheet, ListView, View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {setLastViewedHistoryKey} from '../../common/actions/app'

import {db} from '../../common/firebase'

const PAGING = 20

import Button from '../components/Button'

import colors from '../../common/constants/colors'

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    tid: PropTypes.string,
    uid: PropTypes.string,
    socketStatus: PropTypes.string,
    // from parent component
    name: PropTypes.string.isRequired,
    renderRow: PropTypes.func.isRequired,
    splitter: PropTypes.func,
    orderBy: PropTypes.string,
    startAt: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    ascending: PropTypes.bool, // default false (descending)
    children: PropTypes.node,
    footer: PropTypes.node,
    // action creators:
    setLastViewedHistoryKey: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
      loading: false,
      empty: false,
    }
    this.handleEndReached = this.handleEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.updateDataView = this.updateDataView.bind(this)

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
    this.buffer = []
  }

  componentDidMount() {
    if (this.props.tid) {
      this.tid = this.props.tid
      this.handleLoad()
    }
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
  }

  handleEndReached() {
    if (this.tid) {
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

    const limiter = this.props.ascending ? 'limitToFirst' : 'limitToLast'
    const pager = this.props.ascending ? 'startAt' : 'endAt'

    if (!this.listeningToLast) {
      query[limiter](2).on('value', this.lastEntry, this.handleError)
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

    if (!this.last && this.props.startAt) {
      this.last = this.props.startAt
    }

    if (this.last) {
      query = query[pager](this.last)
    }
    this.first = this.last // see childAdded/flush
    //console.log((this.props.tabLabel || this.props.name) + ' listens to ' + this.props.name + ', orderBy ' + (this.props.orderBy || 'key') + ', ' + pager + ' ' + this.last + ', ' + limiter + ' ' + PAGING)
    query[limiter](PAGING).on('child_added', this.childAdded, this.handleError)
    query[limiter](PAGING).on('child_changed', this.childChanged, this.handleError)
    //query[limiter](PAGING).on('child_moved', this.childMoved, this.handleError)
    query[limiter](PAGING).on('child_removed', this.childRemoved, this.handleError)
  }

  lastEntry(snapshot) {
    this.setState({
      empty: !snapshot.numChildren(),
    })
  }

  childAdded(snapshot) {
    clearTimeout(this.timeout)
    if (snapshot.key !== this.first) { // adjacent queries have a row in common (last of previous === first of current) => deduplicate it (first==null at first page)
      const item = snapshot.val()
      item.id = snapshot.key
      this.buffer.push(item) // add to state but without re-rendering (see batching below)
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
    this.buffer = this.buffer.sort((a, b) => {
      const smaller = this.props.ascending ? -1 : 1
      const bigger = this.props.ascending ? 1 : -1
      return (a[sorter] > b[sorter] ? bigger : smaller)
    })
    if (this.props.name === 'history') {
      if (!this.lastKey || this.buffer[0].id > this.lastKey) {
        this.lastKey = this.buffer[0].id
        this.props.setLastViewedHistoryKey(this.lastKey)
      }
    }
    this.setState({
      loading: false,
    })
    this.updateDataView()
  }

  childChanged(snapshot) {
    const newItem = snapshot.val()
    newItem.id = snapshot.key
    this.buffer = this.buffer.map((item) => (item.id === snapshot.key ? newItem : item))
    this.updateDataView()
  }

  // childMoved() {
  //
  // }

  childRemoved(snapshot) {
    this.buffer = this.buffer.filter((item) => item.id !== snapshot.key)
    this.updateDataView()
  }

  handleError(error) {
    this.setState({
      error: 'firebase.error.' + error.code, //TODO
    })
  }

  updateDataView() {
    if (!this.buffer.length) {
      return
    }

    if (this.props.splitter) {
      const blob = {}
      const sections = []
      this.buffer.forEach((item) => {
        const sectionId = this.props.splitter(item)
        if (!blob[sectionId]) {
          blob[sectionId] = []
          sections.push(sectionId)
        }
        blob[sectionId].push(item)
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(blob, sections),
      })
    } else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.buffer),
      })
    }
  }

  renderFooter() {
    return (
      <View>
        <View style={styles.spinner}>
          <ActivityIndicator size="small" color={colors.main} animating={this.state.loading} />
        </View>
        {this.buffer.length > 0 && this.props.footer}
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionId) {
    if (this.props.splitter) {
      return <Text style={styles.section}>{sectionId}</Text>
    }
    return null
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.empty}>
          <Text style={styles.error}>{this.state.error}</Text>
          <Button id="retry" onPress={this.handleLoad} />
        </View>
      )
    } else if (this.state.empty) {
      return (
        <View style={styles.empty}>
          <Text>Nothing to show!</Text>
        </View>
      )
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.props.renderRow}
        renderFooter={this.renderFooter}
        renderSectionHeader={this.renderSectionHeader}
        style={styles.container}
        onEndReached={this.handleEndReached}
      />
    )
  }

}

const mapStateToProps = (state) => ({
  tid: state.tribe.id,
  uid: state.user.uid,
  socketStatus: state.app.socketStatus,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setLastViewedHistoryKey,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  section: {
    margin: 8,
    alignSelf: 'center',
  },
  spinner: {
    paddingTop: 8,
    justifyContent: 'center', // vertically center
  },
  empty: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
  error: {
    color: colors.error,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AsyncContent)
