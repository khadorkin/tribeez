import React, {Component, PropTypes} from 'react'
import {
  ActivityIndicator,
  DrawerLayoutAndroid,
  Navigator,
  BackAndroid,
  Linking,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  View,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'

import config from '../common/config'
import {auth} from '../common/firebase'
import colors from '../common/constants/colors'

import FormattedMessage from './components/FormattedMessage'
import DrawerContent from './components/DrawerContent'
import Snackbar from './components/Snackbar'
import Alerts from './components/Alerts'
import IconButton from './components/IconButton'

import routes from '../common/routes'
import router from '../common/router'
import getConfig from '../common/actions/getConfig'
import autoLogin from '../common/actions/autoLogin'
import submitLogin from '../common/actions/submitLogin'
import deleteItem from '../common/actions/deleteItem'
import {alert} from '../common/actions/app'

const drawerWidth = Dimensions.get('window').width * 0.75

import {marginTop, navBarHeight} from './dimensions'

class App extends Component {
  static propTypes = {
    // from redux store:
    config: PropTypes.object,
    uid: PropTypes.string,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object,
    item: PropTypes.object.isRequired,
    // action creators:
    getConfig: PropTypes.func.isRequired,
    submitLogin: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    autoLogin: PropTypes.func.isRequired,
    alert: PropTypes.func.isRequired,
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
        const firstRouteName = currentRoutes[0].name
        if (auth.currentUser) {
          if (firstRouteName === 'activity') {
            return false
          }
          router.resetTo(routes.ACTIVITY)
        } else {
          if (firstRouteName === 'welcome') {
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
          route.props = {
            tribe: join[1],
            token: join[2],
          }
          router.push(route)
          return
        }
      }
      this.props.autoLogin()
    })
    .catch(() => {}) // ignore fails

    this.props.getConfig()
  }

  componentWillReceiveProps(props) {
    if (props.config && !this.props.config) {
      if (props.config.minimum_version > config.android.versionName) {
        this.props.alert({
          title_id: 'dialog_update_title',
          text_id: 'dialog_update_text',
          buttons: [
            {text: 'OK', onPress: this.handleOpenStore},
          ],
        })
      }
    }
  }

  ref(drawer) {
    this.drawer = drawer
  }

  routeMapper(loading, items) {
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
        if (route.title) {
          const item = items[route.name]
          const title = item ? item.name : route.title
          //TODO: allow variable height
          return <Text style={styles.navTitle}>{title}</Text>
        } else {
          return <FormattedMessage style={styles.navTitle} id={route.name} />
        }
      },
      RightButton: (route/*, navigator, index, navState*/) => {
        if (loading) {
          return <ActivityIndicator size="small" color="white" style={styles.loading} />
        }
        if (route.type === 'details') { //TODO: not show if item does not exist
          if (route.name === 'member') {
            if (route.props.id === this.props.uid) {
              return (
                <View style={styles.rightIcons}>
                  <IconButton name="edit" color="white" onPress={this.handleEdit.bind(this, route)} style={styles.rightIcon} />
                </View>
              )
            }
          } else {
            if (items[route.name]) {
              return (
                <View style={styles.rightIcons}>
                  <IconButton name="delete" color="white" onPress={this.handleDelete.bind(this, route)} style={styles.rightIcon} />
                  <IconButton name="edit" color="white" onPress={this.handleEdit.bind(this, route)} style={styles.rightIcon} />
                </View>
              )
            }
          }
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

  handleEdit(currentRoute) {
    router.push(routes[currentRoute.name.toUpperCase() + 'S_EDIT'])
  }

  handleDelete(route) {
    this.props.alert({
      title: route.title,
      text_id: 'dialog_delete',
      //onConfirm: this.handleConfirmDelete.bind(this, route),
      buttons: [
        {text_id: 'cancel'},
        {text_id: 'delete', onPress: this.handleConfirmDelete.bind(this, route)},
      ],
    })
  }

  handleConfirmDelete(route) {
    this.props.deleteItem(route.name, route.props.id)
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
    return <route.component {...route.props} />
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar routeMapper={this.routeMapper(this.props.loading, this.props.item)} style={styles.navBar} />
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
          <Alerts />
        </DrawerLayoutAndroid>
      </IntlProvider>
    )
  }
}

// nav bar styles:
const styles = StyleSheet.create({
  navBar: {
    marginTop, // height of status bar (usually aroung 25)
    height: navBarHeight,
  },
  hamburger: {
    padding: 12,
  },
  navTitle: {
    color: colors.lightText,
    fontSize: 24,
    marginTop: 10,
    marginRight: 56, // to not overlap the right icon
  },
  rightIcons: {
    flexDirection: 'row',
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
  config: state.app.config,
  uid: state.user.uid,
  user: state.user,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  formats: state.tribe.formats,
  loading: state.app.loading > 0 || state.app.submitting,
  error: state.app.error,
  item: state.item,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getConfig,
  submitLogin,
  deleteItem,
  autoLogin,
  alert,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
