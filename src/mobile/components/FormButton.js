import React, {Component, PropTypes} from 'react'
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import Touchable from './Touchable'

import colors from '../../common/constants/colors'

class FormButton extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  }

  render() {
    const {intl, id, loading, onPress, style, textStyle, ...props} = this.props

    const content = loading ? (
      <ActivityIndicator size="small" animating={true} color="white" />
    ) : (
      <Text style={[styles.text, textStyle]} {...props}>{intl.formatMessage({id}).toUpperCase()}</Text>
    )

    return (
      <Touchable onPress={loading ? null : onPress} style={[styles.button, style]}>
        {content}
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 28,
    backgroundColor: colors.main,
  },
  text: {
    alignSelf: 'center',
    color: colors.lightText,
  },
})

export default injectIntl(FormButton)
