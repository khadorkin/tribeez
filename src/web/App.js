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
import MessengerIcon from './resources/messenger-icon'
import Dialog from 'material-ui/Dialog'

import Nav from './components/Nav'

import {toggleMenu, closeSnack, updateLang, message} from '../common/actions/app'

import langs from '../common/resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

const fbLocales = {
  fr: 'fr_FR',
  en: 'en_US',
}

import routes from './routes'

import scriptLoader from './utils/scriptLoader'

import config from '../common/config'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      messengerDialog: false,
    }
    this.handleMenuButton = this.handleMenuButton.bind(this)
    this.handleNavToggle = this.handleNavToggle.bind(this)
    this.handleSnackClose = this.handleSnackClose.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
    this.handleMessenger = this.handleMessenger.bind(this)
    this.messengerMounted = this.messengerMounted.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
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
      this.socket = io(config.api_endpoint)
      this.socket.on('message', (msg) => {
        this.props.message(msg)
      })
    }
    if (!props.uid && this.socket) { // log out
      this.socket.disconnect(true)
      this.socket = null
    }
  }

  handleMessenger() {
    this.setState({
      messengerDialog: true,
    })
  }

  messengerMounted(node) {
    if (node) {
      node.innerHTML = `<div class="fb-send-to-messenger"
                          messenger_app_id="${config.facebook_app_id}"
                          page_id="${config.facebook_page_id}"
                          data-ref="${this.props.messenger_token}"
                          color="blue"
                          size="xlarge"></div>`
      if (window.FB) {
        FB.XFBML.parse(node)
      } else {
        window.fbAsyncInit = () => {
          FB.init({
            appId: config.facebook_app_id,
            version: 'v2.6',
          })
          FB.XFBML.parse(node)
        }
        scriptLoader.load('//connect.facebook.net/' + fbLocales[this.props.lang] + '/sdk.js')
      }
    }
  }

  handleDialogClose() {
    this.setState({
      messengerDialog: false,
    })
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
        <div>
          <IconButton onTouchTap={this.handleMessenger}>
            <MessengerIcon color="white" />
          </IconButton>
          <IconButton containerElement={<a href={'https://telegram.me/' + config.telegram_bot_name + '?start=' + this.props.telegram_token} target="_blank" />}>
            <TelegramIcon color="white" />
          </IconButton>
        </div>
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

    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="close" />}
        secondary={true}
        onTouchTap={this.handleDialogClose}
      />,
    ]

    const formats = {
      number: {
        money: {
          style: 'currency',
          currency: this.props.currency,
        },
      },
    }

    return (
      <IntlProvider locale={lang} messages={this.props.messages} formats={formats}>
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

          <Dialog title={<h3><FormattedMessage id="messenger_bot" /></h3>}
            actions={dialogActions}
            open={this.state.messengerDialog}
            onRequestClose={this.handleDialogClose}
          >
            <div ref={this.messengerMounted}></div>
          </Dialog>

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
  messenger_token: PropTypes.string,
  users: PropTypes.array.isRequired,
  currency: PropTypes.string,
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
  messenger_token: state.member.user.messenger_token,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  height: state.app.height,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  snack: state.app.snack,
  loading: state.app.submitting
        || state.activity.loading
        || state.bills.loading
        || state.events.loading
        || state.notes.loading
        || state.polls.loading
        || state.invite.loading
        || state.logout.loading
        || state.member.loading
        || state.join.loading
        || state.reset.loading
        || state.invites.loading,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
  closeSnack,
  updateLang,
  message,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
