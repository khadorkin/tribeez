import React, {Component, PropTypes} from 'react'
import {TouchableNativeFeedback, View} from 'react-native'

class Touchable extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  render() {
    const {onPress, children, ...props} = this.props
    return (
      <TouchableNativeFeedback
        /*eslint-disable new-cap*/
        background={TouchableNativeFeedback.SelectableBackground()}
        /*eslint-enable new-cap*/
        onPress={onPress}
      >
        <View {...props}>
          {children}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

export default Touchable
