import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedRelative extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.number.isRequired,
  }

  render() {
    const {intl, value, ...props} = this.props
    return <Text {...props}>{intl.formatRelative(value)}</Text>
  }
}

export default injectIntl(FormattedRelative)
