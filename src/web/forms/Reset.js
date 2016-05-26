import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'

import styles from '../styles'

import validator, {focus} from '../../common/utils/formValidator'

import submitReset from '../../common/actions/submitReset'

class ResetForm extends Component {

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
        <CardTitle subtitle={this.props.name && <FormattedMessage id="password_change" values={{name: this.props.name}} />} />
        <CardText>
          <TextField ref="password"
            type="password"
            required={true}
            {...password}
          />
          <TextField ref="password2"
            type="password"
            required={true}
            {...password2}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id="submit.reset" />} type="submit" disabled={submitting} />
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
  // from redux:
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
