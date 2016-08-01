import React, {Component, PropTypes} from 'react'
import {View, ScrollView, StyleSheet} from 'react-native'

import Header from '../components/Header'

const SCROLL_TRIGGER = 90 // ideally headerHeight - navBar.height (170-80=90)

class ScrollViewWithHeader extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      scrolled: false,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  handleScroll(event) {
    const scrolled = event.nativeEvent.contentOffset.y > SCROLL_TRIGGER

    if (this.state.scrolled !== scrolled) {
      this.setState({
        scrolled,
      })
    }
  }

  render() {
    const stickyStyle = {position: 'absolute', top: this.state.scrolled ? -SCROLL_TRIGGER : -500}

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={true} keyboardDismissMode="on-drag" onScroll={this.handleScroll}>
          <Header />
          {this.props.children}
        </ScrollView>
        <Header style={stickyStyle} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ScrollViewWithHeader
