import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedNumber extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.number.isRequired,
  }

  render() {
    const {intl, value, ...props} = this.props
    return <Text {...props}>{intl.formatNumber(value)}</Text>
  }
}

export default injectIntl(FormattedNumber)
