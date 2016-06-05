import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedNumber extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.number.isRequired,
    options: PropTypes.object,
  }

  render() {
    const {intl, value, options, ...props} = this.props

    return (
      <Text {...props}>
        {isNaN(value) ? ' ' : intl.formatNumber(value, options)}
      </Text>
    )
  }
}

export default injectIntl(FormattedNumber)
