import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import Header from '../components/Header'

class PageView extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Header only="image" />
        {this.props.children}
        <Header style={styles.shadow} only="shadow" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    top: Header.height,
  },
})

export default PageView
