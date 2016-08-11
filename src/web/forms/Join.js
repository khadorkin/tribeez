import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'

import form from '../../common/forms/join'
import focus from '../../common/utils/formFocus'
import submitJoin from '../../common/actions/submitJoin'
import langs from '../../common/resources/langs'
import colors from '../../common/constants/colors'

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
    this.props.handleSubmit(submitJoin.bind(null, this.props.invite))(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, email, password, lang}, invite} = this.props

    if (!invite || invite.converted) {
      return (
        <div style={{textAlign: 'center', margin: '150px 0'}}>
          <CircularProgress color={colors.main} size={0.5} />
        </div>
      )
    }

    const subtitle = <FormattedMessage id="invited_you" values={{name: invite.inviter_name}} />

    return (
      <Form name="join" title={invite.tribe_name} subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
        <SelectField ref="lang"
          {...lang}
        >
          {langItems}
        </SelectField>
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
      </Form>
    )
  }
}

export default form(JoinForm)
