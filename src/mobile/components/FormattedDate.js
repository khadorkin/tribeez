import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedDate extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  }

  render() {
    const {intl, value, ...props} = this.props
    return (
      <Text {...props}>
        {value ? intl.formatDate(value) : ' '}
      </Text>
    )
  }
}

export default injectIntl(FormattedDate)
