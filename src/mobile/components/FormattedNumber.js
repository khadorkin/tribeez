import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedNumber extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.number.isRequired,
    format: PropTypes.string,
    options: PropTypes.object,
    sign: PropTypes.bool,
  }

  render() {
    const {intl, value, format, options, sign, ...props} = this.props

    let prefix = ''
    if (sign) {
      prefix = (value > 0 ? '+ ' : '− ') // <-- this is the MINUS SIGN in the UTF-8 table
    }

    let text = ' '
    if (!isNaN(value)) {
      text = prefix + intl.formatNumber(Math.abs(value), {format, ...options})
    }

    return (
      <Text {...props}>
        {text}
      </Text>
    )
  }
}

export default injectIntl(FormattedNumber)
