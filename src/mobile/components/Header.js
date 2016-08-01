import React, {Component} from 'react'
import {Dimensions, View, Image, StyleSheet} from 'react-native'

const IMAGE_WIDTH = 1000
const IMAGE_HEIGHT = 430

const width = Dimensions.get('window').width
const height = width * IMAGE_HEIGHT / IMAGE_WIDTH

class Header extends Component {
  static propTypes = {
    style: View.propTypes.style,
  }

  render() {
    return (
      <Image source={require('../../common/images/header.png')}
        resizeMode="cover"
        style={[styles.image, this.props.style]}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
  },
})

export default Header
