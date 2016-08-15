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
        <Header.Image />
        {this.props.children}
        <Header.Shadow style={styles.shadow} />
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
