import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IntlProvider } from 'react-intl'
import { routeActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

//import ThemeManager from 'material-ui/lib/styles/theme-manager'

import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import IconButton from 'material-ui/lib/icon-button'
import HomeIcon from 'material-ui/lib/svg-icons/action/home'
import CircularProgress from 'material-ui/lib/circular-progress'

import Nav from './components/Nav'

import { toggleMenu, resize } from './actions/app'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false }
    this.openMenu = this.openMenu.bind(this)
    window.onresize = this.props.resize
    this.props.resize()
  }
/*
  // modify global theme:
  getChildContext() {
    let theme = ThemeManager.getMuiTheme() // optionally pass a raw theme as parameter
    //theme.flatButton.primaryTextColor = '#00FF00'
    return {
      muiTheme: theme,
    }
  }
*/
  openMenu() {
    if (this.props.uid) {
      this.props.toggleMenu(true)
    }
  }

  render() {
    const loginButton = <FlatButton label="Login" containerElement={<Link to="/login" />} />
    const loading = this.props.loading ? <CircularProgress color="white" size={0.5} /> : null
    const nav = this.props.uid && (
      <LeftNav open={this.props.menu_visible || this.props.desktop} docked={this.props.desktop} onRequestChange={open => this.props.toggleMenu(open)}>
        <Nav />
      </LeftNav>
    ) // do not load left nav if not logged in
    const homeButton = <IconButton containerElement={<Link to="/"/>}><HomeIcon /></IconButton>
    const dockedUserMenu = this.props.uid && this.props.desktop

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <div className="app" style={{marginLeft: dockedUserMenu ? 256 : 0}}>
          {nav}
          <AppBar title={<FormattedMessage id={this.props.page} />} zDepth={0}
                  iconElementRight={this.props.uid ? loading : loginButton}
                  onLeftIconButtonTouchTap={this.openMenu}
                  iconElementLeft={this.props.uid ? null : homeButton}
                  showMenuIconButton={!dockedUserMenu}
          />
          <div>{this.props.children}</div>
        </div>
      </IntlProvider>
    )
  }

}

App.childContextTypes = {
  muiTheme: PropTypes.object,
}

App.propTypes = {
  page: PropTypes.string,
  uid: PropTypes.number,
  messages: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  menu_visible: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  page: state.routing.location.pathname.split('/')[1],
  uid: state.user.data.id,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  loading: state.activity.loading || state.invite.loading || state.logout.loading || state.user.loading, //TODO: mutualize
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
  resize,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
