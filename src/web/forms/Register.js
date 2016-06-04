import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardTitle} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import CityField from './fields/City'
import Captcha from './fields/Captcha'

import currencies from '../../common/resources/currencies'
import langs from '../../common/resources/langs'
import {TRIBE_TYPES} from '../../common/constants/product'

import validator, {focus} from '../../common/utils/formValidator'

import submitRegister from '../../common/actions/submitRegister'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class RegisterForm extends Component {

  constructor(props) {
    super(props)
    this.handleSuggestion = this.handleSuggestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSuggestion(event) {
    event.preventDefault()
    this.props.fields.email.onChange(event.target.innerHTML)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitRegister)(event)
      .catch((errors) => {
        if (errors._backend) { // 'empty' from backend
          // we need to reset it because the API has already tested the value against reCAPTCHa server
          this.refs.captcha.reset()
          delete errors._backend
        }
        focus(errors, this.refs)
      })
  }

  render() {
    const {fields: {name, email, password, lang, tribe_name, tribe_type, city, currency, captcha}} = this.props

    return (
      <Form name="register" onSubmit={this.handleSubmit} {...this.props}>
        <CardTitle title={<FormattedMessage id="you" />} style={{padding: '16px 0'}} />
        <TextField ref="name"
          required={true}
          {...name}
          name="username"
        />
        <TextField ref="email"
          type="email"
          required={true}
          errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + (email.error.id || email.error)} values={email.error.suggestion && {suggestion: <a href="" onTouchTap={this.handleSuggestion}>{email.error.suggestion}</a>}} />}
          {...email}
        />
        <TextField ref="password"
          type="password"
          required={true}
          {...password}
        />
        <SelectField ref="lang"
          {...lang}
        >
          {langItems}
        </SelectField>
        <CardTitle title={<FormattedMessage id="your_tribe" />} style={{padding: '48px 0 16px'}} />
        <TextField ref="tribe_name"
          required={true}
          {...tribe_name}
        />
        <SelectField ref="tribe_type"
          {...tribe_type}
        >
          {typeItems}
        </SelectField>
        <CityField ref="city"
          required={true}
          {...city}
        />
        <SelectField ref="currency"
          {...currency}
        >
          {currencyItems}
        </SelectField>
        <Captcha ref="captcha"
          {...captcha}
        />
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'register',
  fields: ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha'],
  returnRejectedSubmitPromise: true,
  validate: validator.register,
})(RegisterForm)
