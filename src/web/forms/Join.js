import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import SelectField from './fields/Select'

import langs from '../../common/resources/langs'

import styles from '../styles'

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
    const {fields: {name, email, password, lang}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle title={this.props.tribe} subtitle={<FormattedMessage id="invited_you" values={{name: this.props.inviter}} />} />
        <CardText>
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
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id="submit.join" />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

RegisterForm.propTypes = {
  // from parent component:
  token: PropTypes.string.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  initialValues: PropTypes.object,
  inviter: PropTypes.string,
  tribe: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    email: state.join.data.email,
    token: ownProps.token,
  },
  inviter: state.join.data.inviter,
  tribe: state.join.data.tribe,
})

export default reduxForm({
  form: 'join',
  fields: ['name', 'email', 'password', 'lang', 'token'],
  returnRejectedSubmitPromise: true,
  validate: validator.join,
}, mapStateToProps)(RegisterForm)
