import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class Activity extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Activity</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertically center
    alignItems: 'center', // horizontally center
  },
})
