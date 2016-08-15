import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedRelative extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    format: PropTypes.string,
    options: PropTypes.object,
    fallback: PropTypes.string,
  }

  render() {
    const {intl, value, format, options, fallback, ...props} = this.props

    let text = ' '
    if (value) {
      text = intl.formatRelative(value, {format, ...options})
    } else if (fallback) {
      text = intl.formatMessage({id: fallback})
    }

    return (
      <Text {...props}>
        {text}
      </Text>
    )
  }
}

export default injectIntl(FormattedRelative)
