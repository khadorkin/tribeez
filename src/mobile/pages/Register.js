import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import RegisterForm from '../forms/Register'

class Register extends Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={true}>
        <RegisterForm />
      </ScrollView>
    )
  }
}

export default Register
