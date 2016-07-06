import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import form from '../../common/forms/join'
import focus from '../../common/utils/formFocus'
import submitJoin from '../../common/actions/submitJoin'
import langs from '../../common/resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

class JoinForm extends Component {
  static propTypes = {
    // from parent component:
    tribe: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    invite: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitJoin.bind(null, this.props.invite.tribe))(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, email, password, lang}} = this.props

    const subtitle = <FormattedMessage id="invited_you" values={{name: this.props.invite.inviter}} />

    return (
      <Form name="join" title={this.props.invite.tribe} subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
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
        <TextField ref="password"
          type="password"
          required={true}
          errorText={password.touched && password.error && <FormattedMessage id={'error.password_' + password.error} />}
          {...password}
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

export default form(JoinForm)
