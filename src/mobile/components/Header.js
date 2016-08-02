import React, {Component, PropTypes} from 'react'
import {Dimensions, View, Image, StyleSheet} from 'react-native'

const IMAGE_WIDTH = 1000
const IMAGE_HEIGHT = 412
const SHADOW_HEIGHT = 23

class Header extends Component {
  static width = Dimensions.get('window').width
  static height = Dimensions.get('window').width * IMAGE_HEIGHT / IMAGE_WIDTH

  static propTypes = {
    style: View.propTypes.style,
    only: PropTypes.string,
  }

  render() {
    const {only, style} = this.props

    const image = require('../../common/images/header.png')
    const shadow = require('../../common/images/header-shadow.png')

    if (only === 'image') {
      return (
        <Image source={image} resizeMode="cover" style={[styles.image, style]} />
      )
    }

    if (only === 'shadow') {
      return (
        <Image source={shadow} resizeMode="cover" style={[styles.shadow, style]} />
      )
    }

    return (
      <View style={style}>
        <Image source={image} resizeMode="cover" style={styles.image} />
        <Image source={shadow} resizeMode="cover" style={styles.shadow} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: Header.width,
    height: Header.height,
  },
  shadow: {
    width: Header.width,
    height: Header.width * SHADOW_HEIGHT / IMAGE_WIDTH,
  },
})

export default Header
