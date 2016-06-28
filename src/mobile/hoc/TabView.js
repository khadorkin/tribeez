import React, {Component, PropTypes} from 'react'

import ScrollableTabView from 'react-native-scrollable-tab-view'

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
      <ScrollableTabView renderTabBar={this.renderTabBar}>
        {this.props.children}
      </ScrollableTabView>
    )
  }
}

export default TabView
