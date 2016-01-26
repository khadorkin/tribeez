import React from 'react'
import { connect } from 'react-redux'

import login from '../actions/login'
import store from '../store'

class Login extends React.Component {

  handleSubmit(event) {
    event.preventDefault()

    store.dispatch(login(this.refs.email.value, this.refs.password.value))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input type="text" ref="email" placeholder="email" defaultValue="antoine@rousseau.im" /></label>
        <label><input type="password" ref="password" placeholder="password" defaultValue="test" /></label>
        <button type="submit">login</button>
        <p>{store.getState().login.token ? store.getState().login.email : ''}</p>
      </form>
    )
  }

}

export default connect(
  state => ({
    login: state.login
  })
)(Login)
