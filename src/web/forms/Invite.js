import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import form from '../../common/forms/invite'
import focus from '../../common/utils/formFocus'
import submitInvite from '../../common/actions/submitInvite'
import langs from '../../common/resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

class InviteForm extends Component {
  static propTypes = {
    // from parent:
    setHook: PropTypes.func.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
  }

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
    this.props.handleSubmit(submitInvite)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {email, lang}} = this.props

    return (
      <Form name="invite" onSubmit={this.handleSubmit} {...this.props}>
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
      </Form>
    )
  }
}

export default form(InviteForm)
