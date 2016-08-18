import React, {Component} from 'react'
import {Dimensions, View, Image, StyleSheet} from 'react-native'

const IMAGE_WIDTH = 1000
const IMAGE_HEIGHT = 412
const SHADOW_HEIGHT = 23

const width = Dimensions.get('window').width
const height = width * IMAGE_HEIGHT / IMAGE_WIDTH

/*eslint-disable react/no-multi-comp */

class HeaderImage extends Component {
  static propTypes = {
    style: View.propTypes.style,
  }

  render() {
    return (
      <Image source={require('../images/header.png')}
        resizeMode="cover"
        style={[styles.image, this.props.style]}
      />
    )
  }
}

class HeaderShadow extends Component {
  static propTypes = {
    style: View.propTypes.style,
  }

  render() {
    return (
      <Image source={require('../images/header-shadow.png')}
        resizeMode="cover"
        style={[styles.shadow, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
  shadow: {
    width,
    height: width * SHADOW_HEIGHT / IMAGE_WIDTH,
  },
})

export default {
  Image: HeaderImage,
  Shadow: HeaderShadow,
  width,
  height,
}
