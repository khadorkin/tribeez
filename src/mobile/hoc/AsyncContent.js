import React, {Component, PropTypes} from 'react'
import {StyleSheet, ScrollView, View, Text} from 'react-native'

import {connect} from 'react-redux'
import Button from '../components/Button'

const INFINITE_TRIGGER = 200

class AsyncContent extends Component {
  static propTypes = {
    // redux state
    uid: PropTypes.number,
    // from parent component
    data: PropTypes.object.isRequired,
    fetcher: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleLayout = this.handleLayout.bind(this)
    this.handleContentSize = this.handleContentSize.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLoad = this.handleLoad.bind(this)
  }

  componentWillMount() {
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
  }

  componentWillUpdate() {
    this.contentSizeUpdated = false
  }

  handleLayout(event) {
    this.containerHeight = event.nativeEvent.layout.height
  }

  handleContentSize(width, height) {
    this.contentHeight = height
    this.contentSizeUpdated = true
  }

  handleScroll(event) {
    if (!this.contentSizeUpdated) {
      return
    }
    const offset = event.nativeEvent.contentOffset.y
    const atBottom = (offset + INFINITE_TRIGGER > this.contentHeight - this.containerHeight)
    if (this.props.data.paging && atBottom) {
      this.handleLoad(true)
    }
  }

  handleLoad(more) {
    const data = this.props.data
    if (!data.loading && (data.pages === 0 || (more && data.items.length / data.paging === data.pages))) {
      this.props.fetcher(data.pages) // last page is N => N+1 pages => next page is N+1
    }
  }

  render() {
    const {error} = this.props.data

    if (error) {
      return (
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
          <Button id="retry" onPress={this.handleLoad} />
        </View>
      )
    } else {
      return (
        <ScrollView style={styles.container} onScroll={this.handleScroll} onLayout={this.handleLayout} onContentSizeChange={this.handleContentSize}>
          {this.props.children}
        </ScrollView>
      )
    }
  }

}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
})

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  error: {
    flex: 1, // take all space
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
  errorText: {
    color: 'red',
  },
})

export default connect(mapStateToProps)(AsyncContent)
