import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class FormattedMessage extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    defaultMessage: PropTypes.string,
    values: PropTypes.object,
    relative: PropTypes.object,
  }

  render() {
    const {intl, id, defaultMessage, values, relative, ...props} = this.props

    if (values && values.ago) {
      values.ago = intl.formatRelative(values.ago)
    }

    if (relative) {
      for (const key in relative) {
        relative[key] = intl.formatRelative(relative[key])
      }
    }

    return (
      <Text {...props}>
        {id ? intl.formatMessage({id, defaultMessage}, {...values, ...relative}) : ' '}
      </Text>
    )
  }
}

export default injectIntl(FormattedMessage)
