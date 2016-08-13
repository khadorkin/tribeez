import React, {Component, PropTypes} from 'react'
import {TouchableNativeFeedback, View, Text, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'

class Button extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    style: View.propTypes.style,
    textStyle: View.propTypes.style,
  }

  render() {
    const {intl, id, onPress, style, textStyle, ...props} = this.props

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={onPress}
        delayPressIn={0}
      >
        <View style={[styles.button, style]}>
          <Text style={[styles.text, textStyle]} {...props}>
            {intl.formatMessage({id}).toUpperCase()}
          </Text>
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: colors.main,
    ...elevation(2),
    alignSelf: 'center',
    margin: 8,
    borderRadius: 2,
  },
  text: {
    alignSelf: 'center',
    color: colors.lightText,
    fontWeight: '500',
  },
})

export default injectIntl(Button)
