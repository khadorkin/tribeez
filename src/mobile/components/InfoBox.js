import React, {Component, PropTypes} from 'react'
import {View, StyleSheet} from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from './FormattedMessage'

import colors from '../../common/constants/colors'

const data = {
  info: {
    icon: 'info-outline',
    color: colors.main,
  },
  alert: {
    icon: 'error-outline',
    color: colors.warning,
  },
}

class InfoBox extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['info', 'alert']).isRequired,
    id: PropTypes.string.isRequired,
  }

  render() {
    const {type, id} = this.props
    const color = data[type].color

    return (
      <View style={[styles.container, {borderColor: color}]}>
        <MaterialIcon name={data[type].icon} size={24} color={color} style={styles.icon} />
        <FormattedMessage id={id} style={[styles.text, {color}]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 2,
  },
  icon: {
    padding: 8,
  },
  text: {
    flex: 1,
    paddingRight: 8,
    paddingVertical: 8,
  },
})

export default InfoBox
