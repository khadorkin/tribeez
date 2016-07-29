import React, {Component, PropTypes} from 'react'
import {TouchableNativeFeedback, View, Text, ActivityIndicator, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import colors from '../../common/constants/colors'

class Button extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    style: View.propTypes.style,
    textStyle: View.propTypes.style,
  }

  render() {
    const {intl, id, loading, onPress, style, textStyle, ...props} = this.props

    const content = loading ? (
      <ActivityIndicator size="small" animating={true} color="white" />
    ) : (
      <Text style={[styles.text, textStyle]} {...props}>{intl.formatMessage({id}).toUpperCase()}</Text>
    )

    return (
      <TouchableNativeFeedback
        /*eslint-disable new-cap*/
        background={TouchableNativeFeedback.SelectableBackground()}
        /*eslint-enable new-cap*/
        onPress={onPress}
        delayPressIn={0}
      >
        <View style={[styles.button, style]}>
          {content}
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 28,
    backgroundColor: colors.button,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
  },
})

export default injectIntl(Button)
