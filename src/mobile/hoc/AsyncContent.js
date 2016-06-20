import React, {Component, PropTypes} from 'react'
import {StyleSheet, ListView, View, Text} from 'react-native'

import {connect} from 'react-redux'

import Spinner from '../components/Spinner'
import Button from '../components/Button'

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    uid: PropTypes.number,
    // from parent component
    data: PropTypes.object.isRequired,
    fetcher: PropTypes.func.isRequired,
    rowComponent: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleEndReached = this.handleEndReached.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.renderFooter = this.renderFooter.bind(this)

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }),
    }
  }

  componentWillMount() {
    if (this.props.uid) {
      this.uid = this.props.uid

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.data.items),
      })

      this.handleLoad()
    }
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.uid) {
      this.uid = props.uid
      this.handleLoad()
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(props.data.items),
    })
  }

  handleEndReached() {
    if (this.props.data.paging) {
      this.handleLoad(true)
    }
  }

  handleLoad(more) {
    const data = this.props.data
    if (!data.loading && (data.pages === 0 || (more && data.items.length / data.paging === data.pages))) {
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
      </View>
    )
  }

  render() {
    const {error, loading, items} = this.props.data

    if (error) {
      return (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
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
          enableEmptySections={true}
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
  footer: {
    height: 80,
    justifyContent: 'center', // vertically center
  },
  error: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
  errorText: {
    color: 'red',
  },
  empty: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
})

export default connect(mapStateToProps)(AsyncContent)
