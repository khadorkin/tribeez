import React, {Component, PropTypes} from 'react'
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../common/constants/colors'

class Fab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableNativeFeedback
          /*eslint-disable new-cap*/
          background={TouchableNativeFeedback.Ripple(colors.secondaryText, true)}
          /*eslint-enable new-cap*/
          onPress={this.props.onPress}
        >
          <View style={styles.button}>
            <Icon name={this.props.name} color="white" size={30} />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 32,
    backgroundColor: colors.main,
    // Android:
    elevation: 6,
    //iOS: TODO
  },
  button: {
    padding: 12,
  },
})

export default Fab
