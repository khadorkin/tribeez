import React from 'react'
import { Link } from 'react-router'

export default class App extends React.Component {

  render() {
    return (
      <div className="app">
        <h1>MyTribe</h1>
        <p>Hello, World!</p>
        <Link to="login">login</Link>
        <div className="main">{this.props.children}</div>
      </div>
    )
  }

}
