import React, {Component, PropTypes} from 'react'
import {View, Image, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'
import Touchable from '../components/Touchable'

import routes from '../../common/routes'
import router from '../../common/router'
import form from '../../common/forms/login'
import submitLogin from '../../common/actions/submitLogin'
import colors from '../../common/constants/colors'

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
    this.refs.password.getWrappedInstance().focus()
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitLogin.bind(null, this.props.destination))(event) //TODO: prevent duplicate code
  }

  handleCreateAccount() {
    router.replace(routes.REGISTER)
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
        <View style={styles.container}>
          <Image source={require('../../common/images/logo.png')} style={styles.logo} />
          <View style={styles.box}>
            {subtitle}
            <TextField ref="email"
              {...email}
              icon="mail-outline"
              autoFocus={true}
              autoCorrect={false}
              keyboardType="email-address"
              onSubmitEditing={this.handleNext}
            />
            <TextField ref="password"
              {...password}
              icon="lock-outline"
              name="login_password"
              secureTextEntry={true}
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <View style={styles.links}>
            <Touchable onPress={this.handleCreateAccount}>
              <FormattedMessage id="create_account" style={styles.link} />
            </Touchable>
            <Touchable onPress={this.handleLostPassword}>
              <FormattedMessage id="password_lost" style={styles.link} />
            </Touchable>
          </View>
        </View>
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 32, // bump up by 16dp
  },
  logo: {
    width: 64,
    height: 64,
    alignSelf: 'center',
    marginBottom: 16, // some space between logo and form
  },
  box: {
    backgroundColor: 'white',
    elevation: 1,
    margin: 16,
    padding: 16,
  },
  subtitle: {
    marginBottom: 50,
    textAlign: 'center',
  },
  links: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  link: {
    color: colors.button,
  },
})

export default form(LoginForm)
