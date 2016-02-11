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
import CircularProgress from 'material-ui/lib/circular-progress'

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
    const loading = this.props.loading ? <CircularProgress color="white" size="0.5" /> : null
    const nav = this.props.uid && (
      <LeftNav open={this.props.menu_visible} docked={false} onRequestChange={open => this.props.toggleMenu(open)}>
        <Nav />
      </LeftNav>
    ) // do not load left nav if not logged in

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <div className="app">
          {nav}
          <AppBar title={this.props.tribe_name || 'MyTribe'}
                  iconElementRight={this.props.uid ? loading : loginButton}
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
  loading: state.activity.loading || state.invite.loading || state.logout.loading || state.user.loading, //TODO: mutualize
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
