import React, {Component, PropTypes} from 'react'
import {Platform, TouchableOpacity, TouchableNativeFeedback, View} from 'react-native'

class Touchable extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {onPress, children, ...props} = this.props

    let Comp = TouchableOpacity
    let background

    if (Platform.OS === 'android') {
      Comp = TouchableNativeFeedback
      background = TouchableNativeFeedback.SelectableBackground()
    }

    return (
      <Comp background={background} onPress={onPress}>
        <View {...props}>
          {children}
        </View>
      </Comp>
    )
  }
}

export default Touchable
