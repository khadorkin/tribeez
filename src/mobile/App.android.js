import React, {Component, PropTypes} from 'react'
import {
  ActivityIndicator,
  DrawerLayoutAndroid,
  Navigator,
  BackAndroid,
  Linking,
  StyleSheet,
  Text,
  Alert,
  StatusBar,
  Dimensions,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'
import {Crashlytics, Answers} from 'react-native-fabric'

import config from '../common/config'
import {auth} from '../common/firebase'
import colors from '../common/constants/colors'

import FormattedMessage from './components/FormattedMessage'
import DrawerContent from './components/DrawerContent'
import Snackbar from './components/Snackbar'
import IconButton from './components/IconButton'

import routes from '../common/routes'
import router from '../common/router'
import submitLogin from '../common/actions/submitLogin'
import deleteItem from '../common/actions/deleteItem'

const drawerWidth = Dimensions.get('window').width * 0.75

class App extends Component {
  static propTypes = {
    // from redux store:
    uid: PropTypes.string,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object,
    // action creators:
    submitLogin: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
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
    this.routeMapper = this.routeMapper.bind(this)
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.drawerOpened) {
        this.drawer.closeDrawer()
        return true
      }
      const currentRoutes = router.getCurrentRoutes()
      if (currentRoutes.length === 1) {
        if (auth.currentUser) {
          if (currentRoutes[0].name === 'activity') {
            return false
          }
          router.resetTo(routes.ACTIVITY)
        } else {
          if (currentRoutes[0].name === 'welcome') {
            return false
          }
          router.resetTo(routes.WELCOME)
        }
        return true
      }
      router.pop()
      return true
    })

    Linking.getInitialURL().then((url) => {
      if (url) {
        const join = url.match(/\/join\/([^\/]+)\/([^\/]+)/)
        if (join) {
          const route = routes.JOIN
          route.tribe = join[1]
          route.token = join[2]
          router.push(route)
          return
        }
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

    if (props.user.name && !this.props.user.name) { // login
      // Set Fabric infos:
      Crashlytics.setUserIdentifier(String(props.uid))
      Crashlytics.setUserEmail(props.user.email)
      Crashlytics.setUserName(props.user.name)
      Crashlytics.setString('lang', props.user.lang)
      Answers.logLogin('Email', true)
    }

    if (this.props.user.name && !props.user.name) { // logout
      Crashlytics.setUserIdentifier('(anonymous)')
      Crashlytics.setUserEmail('(anonymous)')
      Crashlytics.setUserName('(anonymous)')
      Crashlytics.setString('lang', props.user.lang)
    }
  }

  ref(drawer) {
    this.drawer = drawer
  }

  routeMapper(loading) {
    return {
      LeftButton: (/*route, navigator, index, navState*/) => {
        return this.props.uid && (
          <IconButton name="menu" color="white" onPress={this.handleOpenDrawer} style={styles.hamburger} />
        )
      },
      Title: (route/*, navigator, index, navState*/) => {
        if (route.noHeader) {
          return null
        }
        if (route.item && route.item.name) {
          //TODO: allow variable height
          return <Text style={styles.navTitle}>{route.item.name}</Text>
        } else {
          return <FormattedMessage style={styles.navTitle} id={route.name} />
        }
      },
      RightButton: (route/*, navigator, index, navState*/) => {
        if (loading) {
          return <ActivityIndicator size="small" color="white" style={styles.loading} />
        }
        if (route.type === 'details' && route.name !== 'member') { //TODO: not show if does not exist
          return <IconButton name="delete" color="white" onPress={this.handleDelete.bind(this, route)} style={styles.rightIcon} />
        }
        return null
      },
    }
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
    this.props.deleteItem(route.name, route.item.id)
    router.pop()
  }

  handleOpenStore() {
    Linking.openURL('market://details?id=' + config.android.package).catch(() => {
      Linking.openURL('https://play.google.com/store/apps/details?id=' + config.android.package)
    })
  }

  renderNavigation() {
    return <DrawerContent drawer={this.drawer} opened={this.state.drawerOpened} />
  }

  renderScene(route, navigator) {
    router.update(navigator)
    const props = {}
    if (route.tribe) {
      props.tribe = route.tribe
    }
    if (route.token) {
      props.token = route.token
    }
    if (route.item) {
      props.id = route.item.id
    }
    if (route.edit) {
      props.edit = route.edit
    }
    return <route.component {...props} />
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar routeMapper={this.routeMapper(this.props.loading)} style={styles.navBar} />
    )

    const drawerLockMode = this.props.uid ? 'unlocked' : 'locked-closed'

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages} formats={this.props.formats}>
        <DrawerLayoutAndroid
          renderNavigationView={this.renderNavigation}
          ref={this.ref}
          onDrawerOpen={this.handleDrawerOpened}
          onDrawerClose={this.handleDrawerClosed}
          drawerWidth={drawerWidth}
          drawerLockMode={drawerLockMode}
        >
          <StatusBar translucent={true} backgroundColor={colors.statusBar} animated={true} />
          <Navigator
            initialRoute={routes.WELCOME}
            renderScene={this.renderScene}
            navigationBar={navigationBar}
            sceneStyle={styles.scene}
          />
          <Snackbar />
        </DrawerLayoutAndroid>
      </IntlProvider>
    )
  }
}

// nav bar styles:
const styles = StyleSheet.create({
  navBar: {
    marginTop: 24, // height of status bar
    height: 56, // 80 - 24
  },
  hamburger: {
    padding: 12,
  },
  navTitle: {
    color: colors.lightText,
    fontSize: 24,
    marginTop: 9,
    marginRight: 56, // to not overlap the right icon
  },
  rightIcon: {
    padding: 12,
  },
  loading: {
    padding: 17,
  },
  scene: {
    backgroundColor: colors.background,
  },
})

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  user: state.user,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  formats: state.tribe.formats,
  loading: state.app.loading > 0 || state.app.submitting,
  error: state.app.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  submitLogin,
  deleteItem,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
