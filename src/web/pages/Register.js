import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

import RegisterForm from '../forms/Register'

class Register extends Component {

  render() {
    return (
      <Card className="main">
        <RegisterForm />
      </Card>
    )
  }

}

export default Register
