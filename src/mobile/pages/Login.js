import React, {Component} from 'react'
import {View, StatusBar, StyleSheet} from 'react-native'

import colors from '../../common/constants/colors'

import LoginForm from '../forms/Login'

class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.main} />
        <LoginForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default Login
