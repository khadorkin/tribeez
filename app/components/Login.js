import React from 'react'
import { connect } from 'react-redux'

import login from '../actions/login'

class Login extends React.Component {

  handleSubmit(event) {
    event.preventDefault()

    this.props.dispatch(login(this.refs.email.value, this.refs.password.value))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input type="text" ref="email" placeholder="email" defaultValue="antoine@rousseau.im" /></label>
        <label><input type="password" ref="password" placeholder="password" defaultValue="test" /></label>
        <button type="submit">login</button>
        <p>{this.props.token ? 'Welcome, ' + this.props.email : ''}</p>
      </form>
    )
  }

}

Login.propTypes = {
  token: React.PropTypes.string,
  email: React.PropTypes.string,
}

export default connect(
  state => ({
    token: state.login.token,
    email: state.login.email,
  })
)(Login)
