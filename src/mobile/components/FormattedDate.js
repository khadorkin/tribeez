import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedDate extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.number.isRequired,
  }

  render() {
    const {intl, value, ...props} = this.props
    return <Text {...props}>{intl.formatDate(value)}</Text>
  }
}

export default injectIntl(FormattedDate)
