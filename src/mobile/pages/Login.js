import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

import LoginForm from '../forms/Login'

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
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

export default Login
