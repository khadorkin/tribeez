import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {IntlProvider, FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'

//import ThemeManager from 'material-ui/lib/styles/theme-manager'

import AppBar from 'material-ui/lib/app-bar'
import FlatButton from 'material-ui/lib/flat-button'
import LeftNav from 'material-ui/lib/left-nav'
import IconButton from 'material-ui/lib/icon-button'
import HomeIcon from 'material-ui/lib/svg-icons/action/home'
import IconMenu from 'material-ui/lib/menus/icon-menu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import LangIcon from 'material-ui/lib/svg-icons/action/language'
import CircularProgress from 'material-ui/lib/circular-progress'
import Snackbar from 'material-ui/lib/snackbar'
import TelegramIcon from './resources/telegram-icon'

import Nav from './components/Nav'

import {toggleMenu, closeSnack, updateLang} from './actions/app'

import {list as langsList, map as langsMap} from './resources/langs'

const langItems = langsList.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

import routes from './constants/routes'

/*global __TELEGRAM_BOT_NAME__:false*/

class App extends Component {

  constructor(props) {
    super(props)
    this.handleMenuButton = this.handleMenuButton.bind(this)
    this.handleNavToggle = this.handleNavToggle.bind(this)
    this.handleSnackClose = this.handleSnackClose.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
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

  handleLangChange(event, value) {
    this.props.updateLang(value)
  }

  render() {
    let iconLeft = null
    let iconRight = null
    if (!this.props.uid) { // i.e. anonymous
      if (this.props.pathname === '/') {
        iconLeft = (
          <IconMenu
            iconButtonElement={<IconButton><LangIcon color="white" /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onChange={this.handleLangChange}
            value={this.props.lang}
          >
            {langItems}
          </IconMenu>
        )
      } else {
        iconLeft = <IconButton containerElement={<Link to={routes.WELCOME} />}><HomeIcon /></IconButton>
      }
      iconRight = <FlatButton label={<FormattedMessage id="login" />} containerElement={<Link to={routes.LOGIN} />} style={{textAlign: 'center'}} />
    } else {
      iconRight = (
        <IconButton containerElement={<a href={'https://telegram.me/' + __TELEGRAM_BOT_NAME__ + '?start=' + this.props.telegram_token} target="_blank" />}>
          <TelegramIcon color="white" />
        </IconButton>
      )
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

    const path_parts = this.props.pathname.substr(1).split('/')
    if (this.props.params.token) {
      path_parts.pop()
    }
    const page_id = path_parts.join('_') // e.g. "/members/new" => "members_new"
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
  telegram_token: PropTypes.string,
  lang: PropTypes.string.isRequired,
  desktop: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  messages: PropTypes.object.isRequired,
  menu_visible: PropTypes.bool.isRequired,
  snack: PropTypes.bool.isRequired,
  snackMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
    // action creators:
  toggleMenu: PropTypes.func.isRequired,
  closeSnack: PropTypes.func.isRequired,
  updateLang: PropTypes.func.isRequired,
  // from react-router:
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  pathname: state.routing.location.pathname,
  uid: state.member.user.id,
  telegram_token: state.member.user.telegram_token,
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
  closeSnack,
  updateLang,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
