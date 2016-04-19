import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import {CardTitle, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'

import styles from '../constants/styles'

import validator, {focus} from '../utils/formValidator'

import submitPassword from '../actions/submitPassword'

class PasswordForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitPassword)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {email}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle subtitle={<FormattedMessage id="password_reset" />} />
        <CardText>
          <TextField ref="email"
            type="email"
            required={true}
            {...email}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id="submit.password" />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

PasswordForm.propTypes = {
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
    lang: state.app.lang,
  },
})

export default reduxForm({
  form: 'login',
  fields: ['email', 'lang'],
  returnRejectedSubmitPromise: true,
  validate: validator.password,
  touchOnBlur: false,
}, mapStateToProps)(PasswordForm)
