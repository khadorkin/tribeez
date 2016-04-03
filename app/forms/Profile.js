import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'
import moment from 'moment'

import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'

import langs from '../resources/langs'

import styles from '../constants/styles'

import validator from '../utils/formValidator'

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

  handleSubmit(event) {
    this.props.handleSubmit(submitProfile)(event)
      .catch((errors) => {
        const field = Object.keys(errors)[0]
        if (field !== '_error') {
          this.refs[field].focus()
        }
      })
  }

  render() {
    const {fields: {name, email, lang, phone, birthdate, password, password2}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle subtitle={<span>To change your profile picture, go to <a href="https://gravatar.com" target="_blank">gravatar.com</a></span>} />
        <CardText>
          <TextField ref="name"
            floatingLabelText="Your name"
            required={true}
            errorText={name.touched && name.error && <FormattedMessage id="error.user.name" />}
            {...name}
          />
          <TextField ref="email"
            type="email"
            required={true}
            floatingLabelText="Email"
            errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + email.error} />}
            {...email}
          />
          <SelectField ref="lang"
            floatingLabelText="Language"
            errorText={lang.touched && lang.error && <FormattedMessage id="error.lang" />}
            {...lang}
          >
            {langItems}
          </SelectField>
          <DatePicker ref="birthdate"
            locale={this.props.lang}
            maxDate={today}
            floatingLabelText="Birthdate"
            errorText={birthdate.touched && birthdate.error && <FormattedMessage id="error.birthdate" />}
            {...birthdate}
          />
          <TextField ref="phone"
            floatingLabelText="Phone number"
            errorText={phone.touched && phone.error && <FormattedMessage id="error.phone" />}
            {...phone}
          />
          <TextField ref="password"
            type="password"
            floatingLabelText="Password (leave blank for no change)"
            errorText={password.touched && password.error && <FormattedMessage id="error.password" />}
            {...password}
          />
          <TextField ref="password2"
            type="password"
            floatingLabelText="Password (confirmation)"
            errorText={password2.touched && password2.error && <FormattedMessage id="error.password2" />}
            {...password2}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label="Save profile" type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

ProfileForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
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
