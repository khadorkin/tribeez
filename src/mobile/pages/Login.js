import React, {Component} from 'react'
import {KeyboardAvoidingView, StatusBar, StyleSheet} from 'react-native'

import colors from '../../common/constants/colors'

import LoginForm from '../forms/Login'

class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <StatusBar backgroundColor={colors.main} animated={true} />
        <LoginForm />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Login
