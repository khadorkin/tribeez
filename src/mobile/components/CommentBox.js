import React, {Component} from 'react'
import {TextInput} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class CommentBox extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  render() {
    const {intl, ...props} = this.props
    return (
      <TextInput
        placeholder={intl.formatMessage({id: 'comment'})}
        {...props}
      />
    )
  }
}

export default injectIntl(CommentBox)
