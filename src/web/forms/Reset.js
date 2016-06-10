import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import Form from '../hoc/Form'
import TextField from './fields/Text'

import form from '../../common/forms/reset'
import focus from '../../common/utils/formFocus'
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
    const {fields: {password, password2}} = this.props

    const subtitle = this.props.username && <FormattedMessage id="password_change" values={{name: this.props.username}} />

    return (
      <Form name="reset" subtitle={subtitle} onSubmit={this.handleSubmit}>
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
      </Form>
    )
  }
}

ResetForm.propTypes = {
  // from parent component:
  token: PropTypes.string.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  username: PropTypes.string,
}

export default form(ResetForm)
