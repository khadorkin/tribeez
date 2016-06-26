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

    const prefix = sign && value > 0 ? '+' : ''

    return (
      <Text {...props}>
        {isNaN(value) ? ' ' : (prefix + intl.formatNumber(value, {format, ...options}))}
      </Text>
    )
  }
}

export default injectIntl(FormattedNumber)
