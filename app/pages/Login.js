import React, {Component} from 'react'

import Card from 'material-ui/lib/card/card'

import LoginForm from '../forms/Login'

class Login extends Component {

  render() {
    return (
      <Card className="main">
        <LoginForm />
      </Card>
    )
  }

}

export default Login
