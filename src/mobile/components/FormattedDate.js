import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedDate extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    options: PropTypes.object,
  }

  render() {
    const {intl, value, options, ...props} = this.props

    return (
      <Text {...props}>
        {value ? intl.formatDate(value, options) : ' '}
      </Text>
    )
  }
}

export default injectIntl(FormattedDate)
