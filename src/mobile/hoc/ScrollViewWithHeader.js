import React, {Component, PropTypes} from 'react'
import {Dimensions, View, ScrollView, Image, StyleSheet} from 'react-native'

const SCROLL_TRIGGER = 90 // ideally headerHeight - navBar.height (170-80=90)

const windowWidth = Dimensions.get('window').width
const headerHeight = windowWidth * 412 / 1000

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
    const imageSource = require('../../common/images/header.png')
    const stickyStyle = {position: 'absolute', top: this.state.scrolled ? -SCROLL_TRIGGER : -500}

    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps={true} keyboardDismissMode="on-drag" onScroll={this.handleScroll}>
          <Image source={imageSource} resizeMode="cover" style={styles.image} />
          {this.props.children}
        </ScrollView>
        <Image source={imageSource} resizeMode="cover" style={[styles.image, stickyStyle]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: headerHeight,
    width: windowWidth,
  },
})

export default ScrollViewWithHeader
