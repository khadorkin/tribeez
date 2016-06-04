import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'

import validator, {focus} from '../../common/utils/formValidator'

import submitPassword from '../../common/actions/submitPassword'

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
    const {fields: {email}} = this.props

    const subtitle = <FormattedMessage id="password_reset" />

    return (
      <Form name="password" subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="email"
          type="email"
          required={true}
          {...email}
        />
      </Form>
    )
  }
}

PasswordForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
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
