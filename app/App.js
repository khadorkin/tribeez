import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import { IntlProvider } from 'react-intl'

import messages from './messages/en' // TODO

class App extends Component {

  render() {
    const loginButton = <FlatButton label="Login" containerElement={<Link to="/login" />} />
    const logoutButton = <FlatButton label="Logout" containerElement={<Link to="/logout" />} />

    return (
      <IntlProvider locale="en" messages={messages}>
        <div className="app">
          <AppBar title="MyTribe" iconElementRight={this.props.token ? logoutButton : loginButton} />
          <div className="main">{this.props.children}</div>
        </div>
      </IntlProvider>
    )
  }

}

App.propTypes = {
  token: PropTypes.string,
}

const mapStateToProps = (state) => ({
  token: state.login.token,
})

export default connect(mapStateToProps)(App)
