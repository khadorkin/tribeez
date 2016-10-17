import React, {Component, PropTypes} from 'react'
import {StatusBar, View, Image, StyleSheet} from 'react-native'

import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import FormattedMessage from '../components/FormattedMessage'
import Touchable from '../components/Touchable'

import routes from '../../common/routes'
import router from '../../common/router'
import form from '../../common/forms/login'
import submitLogin from '../../common/actions/submitLogin'
import colors from '../../common/constants/colors'
import {elevation} from '../dimensions'

class LoginForm extends Component {
  static propTypes = {
    // from redux-form:
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
    this.refs.password.getRenderedComponent().getWrappedInstance().focus()
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
    const {invite, initialValues, destination, ...props} = this.props

    const subtitle = invite && invite.converted && (
      <FormattedMessage id="login_to_join" values={invite} style={styles.subtitle} />
    )

    const emptyEmail = !initialValues.email

    return (
      <Form name="login" action={submitLogin.bind(null, destination)} style={styles.form} {...props}>
        <StatusBar backgroundColor={colors.main} animated={true} />
        <Image source={require('../../common/images/logo.png')} style={styles.logo} />
        <View style={styles.box}>
          {subtitle}
          <Field
            name="email"
            component={TextField}
            autoFocus={emptyEmail}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
            onSubmitEditing={this.handleNext}
          />
          <Field ref="password" withRef={true}
            name="password"
            labelId="login_password"
            component={TextField}
            autoFocus={!emptyEmail}
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
      </Form>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
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
    backgroundColor: colors.background,
    ...elevation(1),
    margin: 16,
    padding: 16,
    borderRadius: 2,
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
    color: colors.main,
  },
})

export default form(LoginForm)
