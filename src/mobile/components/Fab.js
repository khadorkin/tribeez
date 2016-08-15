import React, {Component, PropTypes} from 'react'
import {Platform, View, TouchableOpacity, TouchableNativeFeedback, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../common/constants/colors'

class Fab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    type: PropTypes.string,
  }

  render() {
    const {name, onPress, type} = this.props

    const content = (
      <View style={styles.button}>
        <Icon name={name} color="white" size={30} />
      </View>
    )

    return (
      <View style={[styles.container, {backgroundColor: colors[type || 'main']}]}>
        {
          (Platform.OS === 'android' && Platform.Version >= 21) ? (
            <TouchableNativeFeedback onPress={onPress}
              background={TouchableNativeFeedback.Ripple(colors.secondaryText, true)}
            >
              {content}
            </TouchableNativeFeedback>
          ) : (
            <TouchableOpacity onPress={onPress}>
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
    // Android:
    elevation: 6,
    //iOS: TODO
  },
  button: {
    padding: 12,
  },
})

export default Fab
