import React, {Component} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import form from '../../common/forms/invite'
import submitInvite from '../../common/actions/submitInvite'
import langs from '../../common/constants/langs'

class InviteForm extends Component {
  render() {
    return (
      <ScrollView>
        <Form name="invite" action={submitInvite} {...this.props}>
          <Field
            name="email"
            component={TextField}
            autoCorrect={false}
            keyboardType="email-address"
            errorIsCustom={true}
          />
          <Field
            name="lang"
            component={SelectField}
            items={langs}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(InviteForm)
