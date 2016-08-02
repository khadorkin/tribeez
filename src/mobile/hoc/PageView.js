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
        <Header />
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default PageView
