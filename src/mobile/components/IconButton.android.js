import React, {Component, PropTypes} from 'react'
import {TouchableNativeFeedback, View, StyleSheet} from 'react-native'

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
    size: PropTypes.number,
  }

  render() {
    const {onPress, style, iconStyle, children, family, size, ...props} = this.props

    const Icon = ((family === 'evil') ? EvilIcon : MaterialIcon)

    return (
      <TouchableNativeFeedback
        /*eslint-disable new-cap*/
        background={TouchableNativeFeedback.SelectableBackground()}
        /*eslint-enable new-cap*/
        onPress={onPress}
        delayPressIn={0}
      >
        <View style={[styles.button, style]}>
          <Icon size={size || 30} color={colors.icon} style={iconStyle} {...props} />
          {children && <View style={styles.children}>{children}</View>}
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
    marginLeft: 10,
    paddingVertical: 1,
  },
})

export default IconButton
