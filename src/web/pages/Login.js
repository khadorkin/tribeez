import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

import LoginForm from '../forms/Login'

import AutoLogin from '../components/AutoLogin'

class Login extends Component {

  render() {
    return (
      <Card className="main">
        <LoginForm />
        <AutoLogin />
      </Card>
    )
  }

}

export default Login
