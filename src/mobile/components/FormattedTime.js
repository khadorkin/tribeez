import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedTime extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    format: PropTypes.string,
    options: PropTypes.object,
  }

  render() {
    const {intl, value, format, options, ...props} = this.props

    return (
      <Text {...props}>
        {value ? intl.formatTime(value, {format, ...options}) : ' '}
      </Text>
    )
  }
}

export default injectIntl(FormattedTime)
