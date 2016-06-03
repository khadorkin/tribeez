import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'

import {reduxForm} from 'redux-form'

import TextField from '../components/TextField'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import validator from '../../common/utils/formValidator'

import submitLogin from '../../common/actions/submitLogin'

class LoginForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    error: PropTypes.string,
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    // from redux:
    destination: PropTypes.object, // next route after login (when trying to directly access a page when anonymous)
    invite: PropTypes.object.isRequired,
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
    this.props.handleSubmit(submitLogin.bind(null, this.props.destination))(event)
  }

  render() {
    const {fields: {email, password}, error, submitting} = this.props

    return (
      <View style={styles.container}>
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
        <Button id="submit.login" onPress={this.handleSubmit} disabled={submitting} />
        {error && <FormattedMessage id={error} style={{color: 'red'}} />}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
})

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.data,
  initialValues: {
    email: state.join.data.email, // email is null when not coming from /join
  },
})

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  validate: validator.login,
  touchOnBlur: false,
}, mapStateToProps)(LoginForm)
