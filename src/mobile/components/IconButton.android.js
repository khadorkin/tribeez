import React, {Component, PropTypes} from 'react'
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EvilIcon from 'react-native-vector-icons/EvilIcons'

import colors from '../../common/constants/colors'

class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: View.propTypes.style,
    size: PropTypes.number,
    children: PropTypes.node,
    separator: PropTypes.bool, // for details
    iconStyle: View.propTypes.style, // for telegram
    family: PropTypes.string, // for telegram
  }

  render() {
    const {onPress, style, iconStyle, children, family, size, separator, ...props} = this.props

    const Icon = ((family === 'evil') ? EvilIcon : MaterialIcon)

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={onPress}
      >
        <View style={[styles.button, style]}>
          <Icon size={size || 30} color={colors.icon} style={iconStyle} {...props} />
          {children && <View style={separator ? styles.childrenWithSeparator : styles.children}>{children}</View>}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    padding: 10,
  },
  children: {
    marginLeft: 12,
    alignItems: 'center', // like "vertical-align: middle" for text
    flex: 1,
    flexDirection: 'row',
  },
  childrenWithSeparator: {
    marginLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: colors.underline,
    paddingVertical: 6,
    paddingLeft: 16,
  },
})

export default IconButton
