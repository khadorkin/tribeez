import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import Form from '../hoc/Form'
import TextField from './fields/Text'

import routes from '../routes'

import form from '../../common/forms/login'
import focus from '../../common/utils/formFocus'
import submitLogin from '../../common/actions/submitLogin'

class LoginForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    destination: PropTypes.string, // next route after login (when trying to directly access a page when anonymous)
    invite: PropTypes.object.isRequired,
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitLogin.bind(null, this.props.destination))(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {email, password}, invite} = this.props
    const subtitle = invite.email ? <FormattedMessage id="login_to_join" values={invite} /> : ' '

    return (
      <div>
        <Form name="login" subtitle={subtitle} onSubmit={this.handleSubmit} {...this.props}>
          <TextField ref="email"
            type="email"
            required={true}
            {...email}
          />
          <TextField ref="password"
            type="password"
            required={true}
            {...password}
            name="login_password"
          />
          <p style={styles.password}>
            <Link to={routes.PASSWORD}><FormattedMessage id="password_lost" /></Link>
          </p>
        </Form>
        <p style={styles.register}>
          <FormattedMessage id="no_account" />{' '}
          <Link to={routes.REGISTER}><FormattedMessage id="register_now" /></Link>
        </p>
      </div>
    )
  }
}

const styles = {
  password: {textAlign: 'right', marginBottom: 0},
  register: {marginTop: '1em', textAlign: 'center'},
}

export default form(LoginForm)
