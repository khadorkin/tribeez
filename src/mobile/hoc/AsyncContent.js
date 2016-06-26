import React, {Component, PropTypes} from 'react'
import {StyleSheet, ListView, View, Text} from 'react-native'

import {connect} from 'react-redux'

import Spinner from '../components/Spinner'
import Button from '../components/Button'

import colors from '../../common/constants/colors'

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    uid: PropTypes.number,
    // from parent component
    data: PropTypes.object.isRequired,
    fetcher: PropTypes.func.isRequired,
    rowComponent: PropTypes.any.isRequired,
    splitter: PropTypes.func,
    footer: PropTypes.node,
  }

  constructor(props) {
    super(props)
    this.handleEndReached = this.handleEndReached.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)
    this.updateData = this.updateData.bind(this)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      }),
    }
  }

  componentWillMount() {
    this.updateData(this.props)
  }

  componentDidMount() {
    if (this.props.uid) {
      this.uid = this.props.uid
      this.handleLoad()
    }
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.uid) {
      this.uid = props.uid
      this.handleLoad()
    }

    this.updateData(props)
  }

  updateData(props) {
    if (!props.data.items.length) {
      return
    }

    if (props.splitter) {
      const blob = {}
      const sections = []
      props.data.items.forEach((item) => {
        const sectionId = props.splitter(item)
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
        dataSource: this.state.dataSource.cloneWithRows(props.data.items),
      })
    }
  }

  handleEndReached() {
    if (this.props.data.paging) {
      this.handleLoad(true)
    }
  }

  handleLoad(more) {
    const data = this.props.data
    if (data.loading) {
      return
    }
    if (!data.pages || (more && data.items.length / data.paging === data.pages)) {
      this.props.fetcher(data.pages) // last page is N => N+1 pages => next page is N+1
    }
  }

  renderRow(row) {
    return <this.props.rowComponent item={row} />
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <Spinner visible={this.props.data.loading} />
        {this.props.data.items.length > 0 && this.props.footer}
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
    const {error, loading, items} = this.props.data

    if (error) {
      return (
        <View style={styles.empty}>
          <Text style={styles.error}>{error}</Text>
          <Button id="retry" onPress={this.handleLoad} />
        </View>
      )
    } else if (!loading && !items.length) {
      return (
        <View style={styles.empty}>
          <Text>Nothing to show!</Text>
        </View>
      )
    } else {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderFooter={this.renderFooter}
          renderSectionHeader={this.renderSectionHeader}
          style={styles.container}
          onEndReached={this.handleEndReached}
        />
      )
    }
  }

}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
})

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
  },
  section: {
    margin: 8,
    alignSelf: 'center',
  },
  footer: {
    height: 80,
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

export default connect(mapStateToProps)(AsyncContent)
