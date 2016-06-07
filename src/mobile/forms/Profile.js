import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'

import langs from '../../common/resources/langs'

import validator from '../../common/utils/formValidator'

import submitProfile from '../../common/actions/submitProfile'

const today = new Date()

class ProfileForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    lang: PropTypes.string.isRequired,
  }

  render() {
    const {fields: {name, email, lang, birthdate, phone, password, password2}, ...props} = this.props

    return (
      <Form name="profile" action={submitProfile} {...props}>
        <TextField ref="name"
          {...name}
          autoCorrect={false}
          name="username"
          onSubmitEditing={this.handleSubmit}
        />
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
        <DateField ref="birthdate"
          max={today}
          {...birthdate}
        />
        <TextField ref="phone"
          {...phone}
          keyboardType="phone-pad"
          onSubmitEditing={this.handleSubmit}
        />
        <TextField ref="password"
          {...password}
          name="new_password"
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
        <TextField ref="password2"
          {...password2}
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  initialValues: {
    name: state.member.user.name,
    email: state.member.user.email,
    lang: state.member.user.lang,
    phone: state.member.user.phone,
    birthdate: state.member.user.birthdate,
  },
  lang: state.app.lang,
})

export default reduxForm({
  form: 'profile',
  fields: ['name', 'email', 'lang', 'phone', 'birthdate', 'password', 'password2'],
  validate: validator.profile,
  touchOnBlur: false,
}, mapStateToProps)(ProfileForm)
