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
    textStyle: Text.propTypes.style,
    flat: PropTypes.bool,
  }

  render() {
    const {intl, id, onPress, style, textStyle, flat, ...props} = this.props

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={onPress}
      >
        <View style={[styles.button, (flat ? styles.flat : styles.raised), style]}>
          <Text style={[styles.text, (flat ? styles.flatText : styles.raisedText), textStyle]} {...props}>
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
    paddingVertical: 12,
    alignSelf: 'center',
    marginVertical: 8,
  },
  flat: {
    backgroundColor: colors.background,
  },
  raised: {
    backgroundColor: colors.main,
    ...elevation(2),
    borderRadius: 2,
  },
  text: {
    alignSelf: 'center',
    fontWeight: '500',
  },
  flatText: {
    color: colors.main,
  },
  raisedText: {
    color: colors.lightText,
  },
})

export default injectIntl(Button)
