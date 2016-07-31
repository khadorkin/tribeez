import React, {Component, PropTypes} from 'react'
import {Dimensions, View, Image, StyleSheet} from 'react-native'

const windowWidth = Dimensions.get('window').width
const headerHeight = windowWidth * 412 / 1000

class SimpleView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../common/images/header.png')} resizeMode="cover" style={styles.image} />
        {this.props.children}
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

export default SimpleView
