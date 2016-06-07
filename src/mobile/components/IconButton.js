import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import colors from '../../common/constants/colors'

class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: View.propTypes.style,
    iconStyle: View.propTypes.style,
    children: PropTypes.node,
  }

  render() {
    const {onPress, style, iconStyle, children, ...props} = this.props

    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        <Icon size={24} color={colors.icon} style={iconStyle} {...props} />
        {children && <View style={styles.children}>{children}</View>}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  children: {
    marginLeft: 10,
    paddingVertical: 1,
  },
})

export default IconButton
