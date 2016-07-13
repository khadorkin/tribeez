import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {IntlProvider, FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'

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
import WarnIcon from 'material-ui/svg-icons/alert/warning'
import Snackbar from 'material-ui/Snackbar'
import TelegramIcon from './resources/telegram-icon'
import MessengerIcon from './resources/messenger-icon'
import Dialog from 'material-ui/Dialog'

import Nav from './components/Nav'

import config from '../common/config'
import {MENU_WIDTH, FB_LOCALES} from '../common/constants/product'
import routes from './routes'
import scriptLoader from './utils/scriptLoader'
import langs from '../common/resources/langs'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

import {toggleMenu, closeSnack, updateLang, resize} from '../common/actions/app'

class App extends Component {
  static propTypes = {
    // from router:
    location: PropTypes.object.isRequired,
    // from redux:
    uid: PropTypes.string,
    bot_token: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    formats: PropTypes.object,
    lang: PropTypes.string.isRequired,
    desktop: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired,
    messages: PropTypes.object.isRequired,
    menu_visible: PropTypes.bool.isRequired,
    snack: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    // action creators:
    toggleMenu: PropTypes.func.isRequired,
    closeSnack: PropTypes.func.isRequired,
    updateLang: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
    // from react-router:
    children: PropTypes.node.isRequired,
    params: PropTypes.object.isRequired,
  }

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

  componentDidMount() {
    window.onresize = this.props.resize
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
                          data-ref="${this.props.bot_token}"
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
        scriptLoader.load('//connect.facebook.net/' + FB_LOCALES[this.props.lang] + '/sdk.js')
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
          <IconButton containerElement={<a href={'https://telegram.me/' + config.telegram_bot_name + '?start=' + this.props.bot_token} target="_blank" />}>
            <TelegramIcon color="white" />
          </IconButton>
        </div>
      )
    }
    if (this.props.error) {
      iconRight = (
        <IconButton onTouchTap={() => alert(this.props.error)}>
          <WarnIcon color="white" />
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
        width={MENU_WIDTH}
      >
        <Nav module={pathname.split('/')[1]} />
      </Drawer>
    ) // do not load left nav if not logged in

    const dockedUserMenu = uid && desktop

    const path_parts = pathname.split('/').slice(1, -Object.keys(this.props.params).length || undefined) // remove params
    const page_id = path_parts.join('_') // e.g. "/members/new" => "members_new"
    const title = page_id && <FormattedMessage id={page_id} />

    const snack_author = this.props.userMap[snack.author]
    const snack_author_name = snack_author && (snack_author.uid === uid ? '_you_' : snack_author.name)

    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="close" />}
        secondary={true}
        onTouchTap={this.handleDialogClose}
      />,
    ]

    return (
      <IntlProvider locale={lang} messages={this.props.messages} formats={this.props.formats}>
        <div className="app" style={{marginLeft: dockedUserMenu ? MENU_WIDTH : 0}}>
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

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  bot_token: state.user.bot_token,
  userMap: state.tribe.userMap,
  formats: state.tribe.formats,
  lang: state.app.lang, // here is the app language
  desktop: state.app.width > 800,
  height: state.app.height,
  messages: state.app.messages,
  menu_visible: state.app.menu_visible,
  snack: state.app.snack,
  loading: state.app.loading > 0 || state.app.submitting,
  error: state.app.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  toggleMenu,
  closeSnack,
  updateLang,
  resize,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
