import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {IntlProvider, FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import io from 'socket.io-client'

import getMuiTheme from 'material-ui/styles/getMuiTheme'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import HomeIcon from 'material-ui/svg-icons/action/home'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import LangIcon from 'material-ui/svg-icons/action/language'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import TelegramIcon from './resources/telegram-icon'

import Nav from './components/Nav'

import {toggleMenu, closeSnack, updateLang, message} from './actions/app'

import langs from './resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

import routes from './constants/routes'

/*global __TELEGRAM_BOT_NAME__:false __API_ENDPOINT__:false*/

class App extends Component {

  constructor(props) {
    super(props)
    this.handleMenuButton = this.handleMenuButton.bind(this)
    this.handleNavToggle = this.handleNavToggle.bind(this)
    this.handleSnackClose = this.handleSnackClose.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  // modify global theme:
  getChildContext() {
    const theme = getMuiTheme(/* baseTheme */)
    return {
      muiTheme: theme,
    }
  }

  componentWillReceiveProps(props) {
    if (props.uid && !this.socket) { // log in
      this.socket = io(__API_ENDPOINT__)
      this.socket.on('message', (msg) => {
        this.props.message(msg)
      })
    }
    if (!props.uid && this.socket) { // log out
      this.socket.disconnect(true)
      this.socket = null
    }
  }

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
    const {uid, snack, desktop, lang, location: {pathname}} = this.props

    let iconLeft = null
    let iconRight = null
    if (!uid) { // i.e. anonymous
      if (pathname === '/') {
        iconLeft = (
          <IconMenu
            iconButtonElement={<IconButton><LangIcon color="white" /></IconButton>}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onChange={this.handleLangChange}
            value={lang}
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

    const nav = uid && (
      <Drawer
        open={this.props.menu_visible || desktop}
        docked={desktop}
        onRequestChange={this.handleNavToggle}
        style={{overflow: 'hidden'}}
        overlayStyle={{cursor: 'w-resize'}}
      >
        <Nav module={pathname.split('/')[1]} />
      </Drawer>
    ) // do not load left nav if not logged in

    const dockedUserMenu = uid && desktop

    const path_parts = pathname.substr(1).split('/')
    if (this.props.params.token) {
      path_parts.pop()
    }
    if (this.props.params.id) {
      path_parts[1] = 'edit'
    }
    const page_id = path_parts.join('_') // e.g. "/members/new" => "members_new"
    const title = page_id && <FormattedMessage id={page_id} />

    const snack_author = this.props.users.find((u) => u.id === snack.author)
    const snack_author_name = snack_author && (snack_author.id === uid ? '_you_' : snack_author.name)

    return (
      <IntlProvider locale={lang} messages={this.props.messages}>
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
            open={snack.open}
            message={snack.message ? <FormattedMessage id={`snack.${snack.message}`} values={{author: snack_author_name, name: snack.name}} /> : ''}
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
  // from router:
  location: PropTypes.object.isRequired,
  // from redux:
  uid: PropTypes.number,
  telegram_token: PropTypes.string,
  users: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  desktop: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  messages: PropTypes.object.isRequired,
  menu_visible: PropTypes.bool.isRequired,
  snack: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
    // action creators:
  toggleMenu: PropTypes.func.isRequired,
  closeSnack: PropTypes.func.isRequired,
  updateLang: PropTypes.func.isRequired,
  message: PropTypes.func.isRequired,
  // from react-router:
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  telegram_token: state.member.user.telegram_token,
  users: state.member.tribe.users,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  height: state.app.height,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  snack: state.app.snack,
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
  message,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
