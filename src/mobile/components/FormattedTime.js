import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedTime extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }

  render() {
    const {intl, value, ...props} = this.props
    return (
      <Text {...props}>
        {value ? intl.formatTime(value) : ' '}
      </Text>
    )
  }
}

export default injectIntl(FormattedTime)
