import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import langs from '../../common/resources/langs'

import validator, {focus} from '../../common/utils/formValidator'

import submitInvite from '../../common/actions/submitInvite'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

class InviteForm extends Component {

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
          errorText={email.touched && email.error && <FormattedMessage id={'error.email_' + (email.error.id || email.error)} values={email.error.suggestion && {suggestion: <a href="" onTouchTap={this.handleSuggestion}>{email.error.suggestion}</a>}} />}
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

InviteForm.propTypes = {
  // from parent:
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
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
