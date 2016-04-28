import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardActions, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import SelectField from './fields/Select'

import langs from '../resources/langs'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import submitInvite from '../actions/submitInvite'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

class InviteForm extends Component {

  constructor(props) {
    super(props)
    this.handleSuggestion = this.handleSuggestion.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.setHook(() => modified(this.props.fields))
  }

  handleSuggestion(event) {
    event.preventDefault()
    this.props.fields.email.onChange(event.target.innerHTML)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitInvite)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {email, lang}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="email"
            type="email"
            required={true}
            errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + (email.error.id || email.error)} values={email.error.suggestion && {suggestion: <a href="" onTouchTap={this.handleSuggestion}>{email.error.suggestion}</a>}} />}
            {...email}
          />
          <SelectField ref="lang"
            {...lang}
          >
            {langItems}
          </SelectField>
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id="submit.invite" />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

InviteForm.propTypes = {
  // from parent:
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  initialValues: PropTypes.object,
}

const mapStateToProps = (state) => ({
  initialValues: {
    lang: state.member.user.lang,
  },
})

export default reduxForm({
  form: 'invite',
  fields: ['email', 'lang'],
  returnRejectedSubmitPromise: true,
  validate: validator.invite,
}, mapStateToProps)(InviteForm)
