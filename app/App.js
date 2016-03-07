import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'

//import ThemeManager from 'material-ui/lib/styles/theme-manager'

import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button'
import HomeIcon from 'material-ui/lib/svg-icons/action/home'
import CircularProgress from 'material-ui/lib/circular-progress'
import Snackbar from 'material-ui/lib/snackbar'

import Nav from './components/Nav'

import {toggleMenu, resize, closeSnack} from './actions/app'

import routes from './constants/routes'

import en from 'react-intl/lib/locale-data/en'
import fr from 'react-intl/lib/locale-data/fr'
addLocaleData(en)
addLocaleData(fr)

class App extends Component {

  constructor(props) {
    super(props)
    this.handleMenuButton = this.handleMenuButton.bind(this)
    this.handleNavToggle = this.handleNavToggle.bind(this)
    this.handleSnackClose = this.handleSnackClose.bind(this)
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
  handleMenuButton() {
    if (this.props.uid) {
      this.props.toggleMenu(true)
    }
  }

  handleNavToggle(open) {
    this.props.toggleMenu(open)
  }

  handleSnackClose() {
    this.props.closeSnack()
  }

  render() {
    let iconLeft = null
    let iconRight = null
    if (!this.props.uid) { // i.e. anonymous
      iconLeft = <IconButton containerElement={<Link to={routes.WELCOME} />}><HomeIcon /></IconButton>
      iconRight = <FlatButton label="Login" containerElement={<Link to={routes.LOGIN} />} style={{textAlign: 'center'}} />
    }
    if (this.props.loading) {
      iconRight = <CircularProgress color="white" size={0.5} />
    }

    const nav = this.props.uid && (
      <LeftNav open={this.props.menu_visible || this.props.desktop} docked={this.props.desktop} onRequestChange={this.handleNavToggle} style={{overflow: 'hidden'}}>
        <Nav />
      </LeftNav>
    ) // do not load left nav if not logged in

    const dockedUserMenu = this.props.uid && this.props.desktop

    //TODO: improve this:
    const path_parts = this.props.pathname.split('/')
    const page_id = (path_parts[2] && path_parts[2].length < 32 ? `${path_parts[1]}_${path_parts[2]}` : path_parts[1]) // e.g. "/members/new" => "members_new"
    const title = page_id && <FormattedMessage id={page_id} />

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <div className="app" style={{marginLeft: dockedUserMenu ? 256 : 0}}>
          {nav}
          <AppBar title={title} zDepth={0}
            iconElementLeft={iconLeft} iconElementRight={iconRight}
            onLeftIconButtonTouchTap={this.handleMenuButton}
            showMenuIconButton={!dockedUserMenu}
          />
          <div style={{paddingBottom: '90px', minHeight: (this.props.height - 170) + 'px'}}>
            {this.props.children}
          </div>

          <Snackbar
            open={this.props.snack}
            message={this.props.snackMessage ? <FormattedMessage id={`snack.${this.props.snackMessage}`} /> : ''}
            onRequestClose={this.handleSnackClose}
            autoHideDuration={5000}
          />
        </div>
      </IntlProvider>
    )
  }

}

App.childContextTypes = {
  muiTheme: PropTypes.object,
}

App.propTypes = {
  pathname: PropTypes.string,
  uid: PropTypes.number,
  lang: PropTypes.string.isRequired,
  desktop: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  messages: PropTypes.object.isRequired,
  menu_visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  snack: PropTypes.bool.isRequired,
  snackMessage: PropTypes.string,
  toggleMenu: PropTypes.func.isRequired,
  resize: PropTypes.func.isRequired,
  closeSnack: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = (state) => ({
  pathname: state.routing.location.pathname,
  uid: state.member.user.id,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  height: state.app.height,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  snack: state.app.snack,
  snackMessage: state.app.snackMessage,
  loading: state.app.submitting
        || state.activity.loading
        || state.invite.loading
        || state.logout.loading
        || state.member.loading
        || state.invites.loading,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
  resize,
  closeSnack,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
