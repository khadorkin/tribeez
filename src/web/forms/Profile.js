import React, {Component, PropTypes} from 'react'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'

import form from '../../common/forms/profile'
import focus from '../../common/utils/formFocus'
import submitProfile from '../../common/actions/submitProfile'
import langs from '../../common/resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

const today = new Date()

class ProfileForm extends Component {
  static propTypes = {
    // from parent:
    setHook: PropTypes.func.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    lang: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitProfile)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, email, lang, phone, birthdate, password, password2}} = this.props

    const subtitle = <FormattedHTMLMessage id="gravatar" />

    return (
      <Form name="profile" subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="name"
          required={true}
          {...name}
          name="username"
        />
        <TextField ref="email"
          type="email"
          required={true}
          errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + email.error} />}
          {...email}
        />
        <SelectField ref="lang"
          {...lang}
        >
          {langItems}
        </SelectField>
        <DatePicker ref="birthdate"
          locale={this.props.lang}
          maxDate={today}
          {...birthdate}
        />
        <TextField ref="phone"
          {...phone}
        />
        <TextField ref="password"
          type="password"
          errorText={password.touched && password.error && <FormattedMessage id={'error.password_' + password.error} />}
          {...password}
          name="new_password"
        />
        <TextField ref="password2"
          type="password"
          {...password2}
        />
      </Form>
    )
  }
}

export default form(ProfileForm)
