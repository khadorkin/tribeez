import React, {Component, PropTypes} from 'react'
import {Platform, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../common/constants/colors'

class Fab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const content = (
      <View style={styles.button}>
        <Icon name={this.props.name} color="white" size={30} />
      </View>
    )

    return (
      <View style={styles.container}>
        {
          (Platform.OS === 'android' && Platform.Version >= 21) ? (
            <TouchableNativeFeedback onPress={this.props.onPress}
              background={TouchableNativeFeedback.Ripple(colors.secondaryText, true)}
            >
              {content}
            </TouchableNativeFeedback>
          ) : (
            <TouchableOpacity onPress={this.props.onPress}>
              {content}
            </TouchableOpacity>
          )
        }
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
