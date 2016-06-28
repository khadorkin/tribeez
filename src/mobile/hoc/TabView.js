import React, {Component, PropTypes} from 'react'

import ScrollableTabView from 'react-native-scrollable-tab-view'

import TabBar from '../components/TabBar'

class TabView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  renderTabBar(props) {
    return <TabBar {...props} />
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
