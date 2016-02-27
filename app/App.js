import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { routeActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'

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
    let iconLeft = null, iconRight = null
    if (!this.props.uid) { // i.e. anonymous
      iconLeft = <IconButton containerElement={<Link to="/" />}><HomeIcon /></IconButton>
      iconRight = <FlatButton label="Login" containerElement={<Link to="/login" />} />
    }
    if (this.props.loading) {
      iconRight = <CircularProgress color="white" size={0.5} />
    }

    const nav = this.props.uid && (
      <LeftNav open={this.props.menu_visible || this.props.desktop} docked={this.props.desktop} onRequestChange={open => this.props.toggleMenu(open)}>
        <Nav />
      </LeftNav>
    ) // do not load left nav if not logged in

    const dockedUserMenu = this.props.uid && this.props.desktop
    const page_id = this.props.pathname.substr(1).replace(/\//g, '_') // e.g. "/members/new" => "members_new"
    const title = page_id && <FormattedMessage id={page_id} />

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <div className="app" style={{marginLeft: dockedUserMenu ? 256 : 0}}>
          {nav}
          <AppBar title={title} zDepth={0}
                  iconElementLeft={iconLeft} iconElementRight={iconRight}
                  onLeftIconButtonTouchTap={this.openMenu}
                  showMenuIconButton={!dockedUserMenu}
          />
          <div style={{paddingBottom: '90px', minHeight: (window.innerHeight - 170) + 'px'}}>{this.props.children}</div>
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
  pathname: state.routing.location.pathname,
  uid: state.member.user.id,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  loading: state.activity.loading || state.invite.loading || state.logout.loading || state.member.loading || state.invites.loading, //TODO: mutualize
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
  resize,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
