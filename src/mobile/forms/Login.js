import React, {Component, PropTypes} from 'react'
import {Touchable, Text, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import form from '../../common/forms/login'
import submitLogin from '../../common/actions/submitLogin'

class LoginForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    destination: PropTypes.object, // next route after login (when trying to directly access a page when anonymous)
    invite: PropTypes.object,
    initialValues: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleNext = this.handleNext.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNext() {
    this.refs.password.focus()
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitLogin.bind(null, this.props.destination))(event) //TODO: prevent duplicate code
  }

  handleLostPassword() {
    router.push(routes.PASSWORD)
  }

  render() {
    const {fields: {email, password}, invite, ...props} = this.props

    const subtitle = invite && (
      <FormattedMessage id="login_to_join" values={invite} style={styles.subtitle} />
    )

    return (
      <Form name="login" action={submitLogin.bind(null, this.props.destination)} {...props}>
        {subtitle}
        <TextField ref="email"
          {...email}
          autoFocus={true}
          autoCorrect={false}
          keyboardType="email-address"
          onSubmitEditing={this.handleNext}
        />
        <TextField ref="password"
          {...password}
          name="login_password"
          secureTextEntry={true}
          onSubmitEditing={this.handleSubmit}
        />
        <Touchable style={styles.lostPassword} onPress={this.handleLostPassword}>
          <Text style={styles.lostText}>Lost password?</Text>
        </Touchable>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
  lostPassword: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  lostText: {
    //
  },
})

export default form(LoginForm)
