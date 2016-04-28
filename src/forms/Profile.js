import React, {Component, PropTypes} from 'react'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'

import langs from '../resources/langs'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import submitProfile from '../actions/submitProfile'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

const today = new Date()

class ProfileForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setHook(() => modified(this.props.fields))
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitProfile)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, email, lang, phone, birthdate, password, password2}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle subtitle={<FormattedHTMLMessage id="gravatar" />} />
        <CardText>
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
            {...password}
            name="new_password"
          />
          <TextField ref="password2"
            type="password"
            {...password2}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id="submit.profile" />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

ProfileForm.propTypes = {
  // from parent:
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  initialValues: PropTypes.object,
  lang: PropTypes.string.isRequired,
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
  returnRejectedSubmitPromise: true,
  validate: validator.profile,
}, mapStateToProps)(ProfileForm)
