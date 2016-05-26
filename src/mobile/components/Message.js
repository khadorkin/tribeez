import React, {Component, PropTypes} from 'react'
import {Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class Message extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string,
    values: PropTypes.object,
  }

  render() {
    const {intl, id, defaultMessage, values, ...props} = this.props
    return <Text {...props}>{intl.formatMessage({id, defaultMessage}, values)}</Text>
  }
}

export default injectIntl(Message)
