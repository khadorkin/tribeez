import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import langs from '../../common/resources/langs'

import validator from '../../common/utils/formValidator'

import submitInvite from '../../common/actions/submitInvite'

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

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.member.user.lang,
  },
})

export default reduxForm({
  form: 'invite',
  fields: ['email', 'lang'],
  validate: validator.invite,
  touchOnBlur: false,
}, mapStateToProps)(InviteForm)
