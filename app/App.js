import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IntlProvider } from 'react-intl'
import { routeActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'

import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import HomeIcon from 'material-ui/lib/svg-icons/action/home'

import messages from './messages' // TODO
import lang from './utils/lang'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
    this.openMenu = this.openMenu.bind(this)
  }

  openMenu() {
    if (this.props.uid) {
      this.setState({ open: !this.state.open })
    }
  }

  render() {
    const loginButton = <FlatButton label="Login" containerElement={<Link to="/login" />} />
    const logoutButton = <FlatButton label="Logout" containerElement={<Link to="/logout" />} />

    return (
      <IntlProvider locale={this.props.lang} messages={messages[this.props.lang]}>
        <div className="app">
          <LeftNav open={this.state.open} docked={false} onRequestChange={open => this.setState({open})}>
            <MenuItem checked={this.props.path === '/home'} containerElement={<Link to="/home" />}>Home</MenuItem>
            <MenuItem checked={this.props.path === '/invite'} containerElement={<Link to="/invite" />}>Invite</MenuItem>
          </LeftNav>
          <AppBar title={this.props.tribe_name || 'MyTribe'}
                  iconElementRight={this.props.uid ? logoutButton : loginButton}
                  onLeftIconButtonTouchTap={this.openMenu}
                  iconElementLeft={this.props.uid ? null : <IconButton containerElement={<Link to="/"/>}><HomeIcon /></IconButton>}
          />
          <div className="main">{this.props.children}</div>
        </div>
      </IntlProvider>
    )
  }

}

App.propTypes = {
  tribe_name: PropTypes.string,
  token: PropTypes.string,
  lang: PropTypes.string,
}

const mapStateToProps = (state) => ({
  tribe_name: state.user.tribe.name,
  uid: state.user.data.id,
  lang: state.user.data.lang || lang.getDefault(), // here is the app language
  path: state.routing.location.pathname,
})

export default connect(mapStateToProps)(App)
