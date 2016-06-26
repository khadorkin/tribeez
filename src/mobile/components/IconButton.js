import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet, View} from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import colors from '../../common/constants/colors'

class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: View.propTypes.style,
    iconStyle: View.propTypes.style,
    children: PropTypes.node,
    family: PropTypes.string,
  }

  render() {
    const {onPress, style, iconStyle, children, family, ...props} = this.props

    const Icon = ((family === 'evil') ? EvilIcon : MaterialIcon)

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
    flex: 1, // to wrap
  },
})

export default IconButton
