import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import form from '../../common/forms/invite'
import submitInvite from '../../common/actions/submitInvite'
import langs from '../../common/resources/langs'

class InviteForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
  }

  render() {
    const {fields: {email, lang}, ...props} = this.props

    return (
      <Form name="invite" action={submitInvite} {...props}>
        <TextField ref="email"
          {...email}
          errorIsObject={true}
          autoCorrect={false}
          keyboardType="email-address"
          onSubmitEditing={this.handleSubmit}
        />
        <SelectField ref="lang"
          {...lang}
          items={langs}
        />
      </Form>
    )
  }
}

export default form(InviteForm)
