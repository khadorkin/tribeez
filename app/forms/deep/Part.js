import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MoneyField from '../fields/Money'

export default class Part extends Component {

  //TODO: pure rendering?

  render() {
    const {user, amount, ...rest} = this.props

    if (!user) {
      return null // in cases users are not loaded yet
    }

    return (
      <MoneyField
        floatingLabelText={<FormattedMessage id="label.part" values={{name: user.name}} />}
        errorText={amount.touched && amount.error && <FormattedMessage id="error.amount" />}
        {...amount}
      />
    )
  }
}

Part.propTypes = {
  // from parent form:
  user: PropTypes.object,
  amount: PropTypes.object.isRequired,
}