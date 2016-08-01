import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import Header from '../components/Header'
import TabBar from '../components/TabBar'

class TabView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderTabBar = this.renderTabBar.bind(this)
  }

  renderTabBar(props) {
    const badges = this.props.children.map((child) => child.props.badge)
    return <TabBar {...props} badges={badges} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} />
        <ScrollableTabView renderTabBar={this.renderTabBar} {...this.props}>
          {this.props.children}
        </ScrollableTabView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: -57.5,
  },
})

export default TabView
