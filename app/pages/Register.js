import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import RegisterForm from '../forms/Register'

class Register extends React.Component {

  render() {
    return (
      <Card className="main">
        <RegisterForm />
      </Card>
    )
  }

}

export default Register
