import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Touchable from './Touchable'

import colors from '../../common/constants/colors'

class Fab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <View style={styles.container}>
        <Touchable onPress={this.props.onPress} style={styles.button}>
          <Icon name={this.props.name} color="white" size={24} />
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 44,
    backgroundColor: colors.main,
    // Android:
    elevation: 5,
    //iOS: TODO
  },
  button: {
    padding: 16,
  },
})

export default Fab
