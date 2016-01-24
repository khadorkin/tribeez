import React from 'react'

export default class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    const email = this.refs.email.value
    const pass = this.refs.pass.value

    //TODO: invoke API then store received token
    this.setState({error:true})
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label><input ref="email" placeholder="email" /></label>
        <label><input ref="pass" placeholder="password" /></label>
        <button type="submit">login</button>
        {this.state.error && (
          <p>WIP</p>
        )}
      </form>
    )
  }

}
