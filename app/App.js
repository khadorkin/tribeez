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

import Nav from './components/Nav'

import { toggleMenu } from './actions/app'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
    this.openMenu = this.openMenu.bind(this)
  }

  openMenu() {
    if (this.props.uid) {
      this.props.toggleMenu(true)
    }
  }

  render() {
    const loginButton = <FlatButton label="Login" containerElement={<Link to="/login" />} />
    const logoutButton = <FlatButton label="Logout" containerElement={<Link to="/logout" />} />

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <div className="app">
          <LeftNav open={this.props.menu_visible} docked={false} onRequestChange={open => this.props.toggleMenu(open)}>
            <Nav />
          </LeftNav>
          <AppBar title={this.props.tribe_name || 'MyTribe'}
                  iconElementRight={this.props.uid ? logoutButton : loginButton}
                  onLeftIconButtonTouchTap={this.openMenu}
                  iconElementLeft={this.props.uid ? null : <IconButton containerElement={<Link to="/"/>}><HomeIcon /></IconButton>}
          />
          <div>{this.props.children}</div>
        </div>
      </IntlProvider>
    )
  }

}

App.propTypes = {
  tribe_name: PropTypes.string,
  uid: PropTypes.number,
  messages: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  menu_visible: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  tribe_name: state.user.tribe.name,
  uid: state.user.data.id,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  path: state.routing.location.pathname,
  menu_visible: state.app.menu_visible,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
