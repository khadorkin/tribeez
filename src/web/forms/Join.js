import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import langs from '../../common/resources/langs'

import validator, {focus} from '../../common/utils/formValidator'

import submitJoin from '../../common/actions/submitJoin'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
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
    this.props.handleSubmit(submitJoin)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, email, password, lang}} = this.props

    const subtitle = <FormattedMessage id="invited_you" values={{name: this.props.inviter}} />

    return (
      <Form name="join" subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
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
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  // from parent component:
  token: PropTypes.string.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  initialValues: PropTypes.object,
  inviter: PropTypes.string,
  title: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.data.email,
    token: ownProps.token,
  },
  inviter: state.join.data.inviter,
  title: state.join.data.tribe_name, // automatically sent to <Form> thanks to the spread operator ;)
})

export default reduxForm({
  form: 'join',
  fields: ['name', 'email', 'password', 'lang', 'token'],
  returnRejectedSubmitPromise: true,
  validate: validator.join,
}, mapStateToProps)(RegisterForm)
