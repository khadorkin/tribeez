import React from 'react'
const PropTypes = React.PropTypes
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'

import styles from '../constants/styles'

import validator, {focus} from '../utils/formValidator'

import submitReset from '../actions/submitReset'

class ResetForm extends React.Component {

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
    this.props.handleSubmit(submitReset)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {password, password2}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle subtitle={this.props.name && `${this.props.name}, please choose a new password`} />
        <CardText>
          <TextField ref="password"
            type="password"
            floatingLabelText="Password"
            required={true}
            errorText={password.touched && password.error && <FormattedMessage id="error.password" />}
            {...password}
          />
          <TextField ref="password2"
            type="password"
            floatingLabelText="Password (again, for confirmation)"
            required={true}
            errorText={password2.touched && password2.error && <FormattedMessage id="error.password2" />}
            {...password2}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label="Change my password" type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

ResetForm.propTypes = {
  // from parent component:
  token: PropTypes.string.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  name: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    token: ownProps.token,
  },
  name: state.reset.name,
})

export default reduxForm({
  form: 'reset',
  fields: ['password', 'password2', 'token'],
  returnRejectedSubmitPromise: true,
  validate: validator.reset,
}, mapStateToProps)(ResetForm)
