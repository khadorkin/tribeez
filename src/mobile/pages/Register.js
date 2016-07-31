import React, {Component} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import RegisterForm from '../forms/Register'

class Register extends Component {
  render() {
    return (
      <ScrollViewWithHeader>
        <RegisterForm />
      </ScrollViewWithHeader>
    )
  }
}

export default Register
