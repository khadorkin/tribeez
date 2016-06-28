import React, {Component, PropTypes} from 'react'
import {DrawerLayoutAndroid, Navigator, BackAndroid, Linking, StyleSheet, View, Text, Alert} from 'react-native'

import {Crashlytics, Answers} from 'react-native-fabric'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'

import './userAgent'
import config from '../common/config'
import io from 'socket.io-client'

import FormattedMessage from './components/FormattedMessage'
import DrawerContent from './components/DrawerContent'
import Snackbar from './components/Snackbar'
import IconButton from './components/IconButton'

import routes from '../common/routes'
import router from '../common/router'
import colors from '../common/constants/colors'
import getMember from '../common/actions/getMember'
import {message, setSocketStatus} from '../common/actions/app'
import deleteBill from '../common/actions/deleteBill'
import deleteEvent from '../common/actions/deleteEvent'
import deletePoll from '../common/actions/deletePoll'
import deleteTask from '../common/actions/deleteTask'

class App extends Component {
  static propTypes = {
    // from redux store:
    uid: PropTypes.number,
    user: PropTypes.object.isRequired,
    error: PropTypes.string,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object,
    // action creators:
    getMember: PropTypes.func.isRequired,
    message: PropTypes.func.isRequired,
    setSocketStatus: PropTypes.func.isRequired,
    deleteBill: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
    deletePoll: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      drawerOpened: false,
    }
    this.ref = this.ref.bind(this)
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
    this.renderNavigation = this.renderNavigation.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.handleDrawerOpened = this.handleDrawerOpened.bind(this)
    this.handleDrawerClosed = this.handleDrawerClosed.bind(this)

    this.routeMapper = {
      LeftButton: (/*route, navigator, index, navState*/) => {
        return this.props.uid && (
          <IconButton name="menu" color="white" onPress={this.handleOpenDrawer} style={styles.hamburger} />
        )
      },
      Title: (route/*, navigator, index, navState*/) => {
        if (route.item && route.item.name) {
          return <Text style={styles.navTitle}>{route.item.name}</Text>
        } else {
          return <FormattedMessage style={styles.navTitle} id={route.name} />
        }
      },
      RightButton: (route/*, navigator, index, navState*/) => {
        if (route.type === 'details') { //TODO: not show if does not exist
          return <IconButton name="delete" color="white" onPress={this.handleDelete.bind(this, route)} style={styles.rightIcon} />
        }
        return null
      },
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.drawerOpened) {
        this.drawer.closeDrawer()
        return true
      }
      const currentRoutes = router.getCurrentRoutes()
      if (currentRoutes.length === 1) {
        if (currentRoutes[0].name === 'activity') {
          return false
        }
        router.resetTo(routes.ACTIVITY)
        return true
      }
      router.pop()
      return true
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        const join = url.match(/\/join\/(\w+)/)
        if (join) {
          const route = routes.JOIN
          route.token = join[1]
          router.push(route)
          return
        }
        const reset = url.match(/\/reset\/(\w+)/)
        if (reset) {
          const route = routes.RESET
          route.token = reset[1]
          router.push(route)
          return
        }
      }

      // default action: check for already authenticated user (HttpOnly cookie)
      if (!this.props.uid) {
        this.props.getMember(routes.ACTIVITY, routes.ACTIVITY, routes.WELCOME)
      }
    })
    //TODO: catch
  }

  componentWillReceiveProps(props) {
    if (props.error === 'version') {
      Alert.alert(props.messages.dialog_update_title, props.messages.dialog_update_text, [
        {text: 'OK', onPress: this.handleOpenStore},
      ])
      return
    }
    if (props.uid && !this.socket) { // log in
      // Connect to WebSocket:
      this.socket = io(config.api_endpoint, {
        jsonp: false,
        transports: ['websocket'],
      })
      this.socket.on('message', (msg) => {
        this.props.message(msg)
      })
      this.socket.on('connect', () => {
        this.props.setSocketStatus('connected', router.getCurrentName())
      })
      this.socket.on('error', (/*num*/) => {
        this.props.setSocketStatus('error', router.getCurrentName())
      })
      this.socket.on('disconnect', () => {
        this.props.setSocketStatus('disconnected', router.getCurrentName())
      })
      this.socket.on('reconnecting', (/*num*/) => {
        this.props.setSocketStatus('reconnecting', router.getCurrentName())
      })
      this.socket.on('reconnect', (/*num*/) => {
        this.props.setSocketStatus('connected', router.getCurrentName())
      })
      this.socket.on('reconnect_error', (/*num*/) => {
        this.props.setSocketStatus('error', router.getCurrentName())
      })
      this.socket.on('reconnect_failed', () => {
        this.props.setSocketStatus('error', router.getCurrentName())
      })
      // Set Fabric infos:
      Crashlytics.setUserIdentifier(String(props.uid))
      Crashlytics.setUserEmail(props.user.email)
      Crashlytics.setUserName(props.user.name)
      Crashlytics.setString('lang', props.user.lang)
      Answers.logLogin('Email', true)
    }
    if (!props.uid && this.socket) { // log out
      // Disconnect WebSocket:
      this.socket.disconnect(true)
      this.socket = null

      // Clear Fabric infos
      Crashlytics.setUserIdentifier(null)
      Crashlytics.setUserEmail(null)
      Crashlytics.setUserName(null)
      Crashlytics.setString('lang', null)
    }
  }

  ref(drawer) {
    this.drawer = drawer
  }

  handleOpenDrawer() {
    this.drawer.openDrawer()
  }

  handleDrawerOpened() {
    this.setState({
      drawerOpened: true,
    })
  }

  handleDrawerClosed() {
    this.setState({
      drawerOpened: false,
    })
  }

  handleDelete(route) {
    const {messages} = this.props
    Alert.alert(route.item.name, messages.dialog_delete, [
      {text: messages.cancel},
      {text: messages.delete, onPress: this.handleConfirmDelete.bind(this, route)},
    ])
  }

  handleConfirmDelete(route) {
    switch (route.name) {
      case 'bill':
        this.props.deleteBill(route.item.id)
        break
      case 'event':
        this.props.deleteEvent(route.item.id)
        break
      case 'poll':
        this.props.deletePoll(route.item.id)
        break
      case 'task':
        this.props.deleteTask(route.item.id)
        break
    }
    router.pop()
  }

  handleOpenStore() {
    Linking.openURL('market://details?id=' + config.android_package).catch(() => {
      Linking.openURL('https://play.google.com/store/apps/details?id=' + config.android_package)
    })
  }

  renderNavigation() {
    return <DrawerContent drawer={this.drawer} opened={this.state.drawerOpened} />
  }

  renderScene(route, navigator) {
    router.update(route, navigator)
    const props = {}
    if (route.token) {
      props.token = route.token
    }
    if (route.item) {
      props.id = route.item.id
    }
    if (route.edit) {
      props.edit = route.edit
    }
    return (
      <View style={styles.page}>
        <route.component {...props} />
      </View>
    )
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={this.routeMapper}
        style={styles.navBar}
      />
    )

    const drawerLockMode = this.props.uid ? 'unlocked' : 'locked-closed'

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages} formats={this.props.formats}>
        <DrawerLayoutAndroid
          renderNavigationView={this.renderNavigation}
          statusBarBackgroundColor={colors.main}
          ref={this.ref}
          onDrawerOpen={this.handleDrawerOpened}
          onDrawerClose={this.handleDrawerClosed}
          drawerWidth={250}
          drawerLockMode={drawerLockMode}
        >
          <Navigator
            initialRoute={routes.WELCOME}
            renderScene={this.renderScene}
            navigationBar={navigationBar}
          />
          <Snackbar />
        </DrawerLayoutAndroid>
      </IntlProvider>
    )
  }
}

const styles = StyleSheet.create({
  hamburger: {
    padding: 15,
  },
  navBar: {
    backgroundColor: colors.main,
  },
  navTitle: {
    color: 'white',
    marginVertical: 15,
    fontWeight: '500',
    fontSize: 16,
    marginRight: 56, // to not overlap the right icon
  },
  page: {
    marginTop: 56,
    flex: 1,
    backgroundColor: colors.background,
  },
  rightIcon: {
    padding: 15,
  },
})

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  user: state.member.user,
  error: state.member.error,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  formats: state.member.formats,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMember,
  message,
  setSocketStatus,
  deleteBill,
  deleteEvent,
  deletePoll,
  deleteTask,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
