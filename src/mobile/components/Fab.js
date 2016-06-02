import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../common/constants/colors'

class Fab extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.button}>
        <Icon name="add" color="white" size={24} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    backgroundColor: colors.main,
    borderRadius: 44,
    // Android:
    elevation: 2,
    //iOS:
    // shadowColor: 'red',
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
  },
})

export default Fab
