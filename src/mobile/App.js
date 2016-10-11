import React, {Component, PropTypes} from 'react'
import {
  ActivityIndicator,
  Navigator,
  BackAndroid,
  Linking,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  View,
  Platform,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'

import DrawerLayout from 'react-native-drawer-layout'

import {deviceInfo} from '../common/config'
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
import deleteItem from '../common/actions/deleteItem'
import {alert} from '../common/actions/app'

const drawerWidth = Dimensions.get('window').width * 0.75

import {marginTop, navBarHeight} from './dimensions'

class App extends Component {
  static propTypes = {
    // from redux store:
    config: PropTypes.object,
    uid: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    formats: PropTypes.object,
    item: PropTypes.object.isRequired,
    // action creators:
    getConfig: PropTypes.func.isRequired,
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
      if (!url || !this.handleInitialUrl(url)) {
        this.props.autoLogin() // always triggered in iOS (TODO: handle conflict with logged in user vs /join link)
      }
    })
    .catch(() => {}) // ignore fails

    Linking.addEventListener('url', (event) => {
      this.handleInitialUrl(event.url)
    })

    this.props.getConfig()
  }

  componentWillReceiveProps(props) {
    if (props.config && !this.props.config) {
      const version = Number(deviceInfo.appVersion.split('.')[0]) // the major bit ('2.1.0' => 2)
      if (props.config.version > version) {
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

  handleInitialUrl(url) {
    const join = url.match(/\/join\/([^\/]+)\/([^\/]+)/)
    if (join) {
      const route = routes.JOIN
      route.props = {
        tribe: join[1],
        token: join[2],
      }
      router.push(route)
      return true
    }
    return false
  }

  routeMapper(loading, items) {
    return {
      LeftButton: (route/*, navigator, index, navState*/) => {
        if (Platform.OS === 'ios') {
          if (!route.root) {
            const color = ['login', 'password'].includes(route.name) ? colors.main : colors.lightText
            return (
              <IconButton name="arrow-back" color={color} onPress={this.handleBack} style={styles.hamburger} />
            )
          }
        }
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
        if (loading && route.name !== 'welcome') {
          return <ActivityIndicator size="small" color="white" style={styles.loading} />
        }
        if (route.details) { //TODO: not show if item does not exist
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

  handleBack() {
    if (router.getCurrentRoutes().length === 1) {
      router.resetTo(routes.ACTIVITY)
    } else {
      router.pop()
    }
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
    Linking.openURL('market://details?id=' + deviceInfo.bundleId).catch(() => {
      Linking.openURL('https://play.google.com/store/apps/details?id=' + deviceInfo.bundleId)
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
        <DrawerLayout
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
        </DrawerLayout>
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
    marginTop: (Platform.OS === 'ios' ? 12 : 10),
    marginRight: (Platform.OS === 'ios' ? 95 : 56), // to not overlap the right icon
    marginLeft: (Platform.OS === 'ios' ? 45 : 0),
  },
  rightIcons: {
    flexDirection: 'row',
  },
  rightIcon: {
    padding: 12,
    paddingLeft: 6,
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
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  formats: state.tribe.formats,
  loading: state.app.loading > 0 || state.app.submitting,
  item: state.item,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getConfig,
  deleteItem,
  autoLogin,
  alert,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
