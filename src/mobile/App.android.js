import React, {Component, PropTypes} from 'react'

import {
  DrawerLayoutAndroid,
  Navigator,
  BackAndroid,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {IntlProvider} from 'react-intl'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from './components/FormattedMessage'

import routes from '../common/routes'
import router from '../common/router'

import DrawerContent from './components/DrawerContent'

import getMember from '../common/actions/getMember'

class App extends Component {
  static propTypes = {
    getMember: PropTypes.func.isRequired,
    uid: PropTypes.number,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    currency: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
    this.renderNavigation = this.renderNavigation.bind(this)
    this.renderScene = this.renderScene.bind(this)
    this.handleDrawerOpened = this.handleDrawerOpened.bind(this)
    this.handleDrawerClosed = this.handleDrawerClosed.bind(this)

    this.routeMapper = {
      LeftButton: (/*route, navigator, index, navState*/) => {
        return this.props.uid && (
          <TouchableHighlight onPress={this.handleOpenDrawer} style={styles.hamburger} underlayColor="rgb(0, 188, 212)">
            <Icon name="menu" size={24} color="white" />
          </TouchableHighlight>
        )
      },
      Title: (route/*, navigator, index, navState*/) => {
        return (
          <FormattedMessage style={styles.navTitle} id={route.name} />
        )
      },
      RightButton: (/*route, navigator, index, navState*/) => {
        return null // nothing for now
      },
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.drawerOpened) {
        this.drawer.closeDrawer()
        return true
      }
      if (router.getCurrentRoutes().length === 1) {
        return false
      }
      router.pop()
      return true
    })

    if (!this.props.uid) {
      this.props.getMember(routes.ACTIVITY, routes.ACTIVITY, routes.WELCOME)
    }
  }

  ref(drawer) {
    this.drawer = drawer
  }

  handleOpenDrawer() {
    this.drawer.openDrawer()
  }

  handleDrawerOpened() {
    this.drawerOpened = true
  }

  handleDrawerClosed() {
    this.drawerOpened = false
  }

  renderNavigation() {
    return <DrawerContent drawer={this.drawer} />
  }

  renderScene(route, navigator) {
    router.update(route, navigator)
    return <route.component />
  }

  render() {
    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={this.routeMapper}
        style={styles.navBar}
      />
    )

    const formats = {
      number: {
        money: {
          style: 'currency',
          currency: this.props.currency,
        },
      },
    }

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages} formats={formats}>
        <DrawerLayoutAndroid
          renderNavigationView={this.renderNavigation}
          statusBarBackgroundColor="rgb(0, 188, 212)"
          ref={this.ref}
          onDrawerOpen={this.handleDrawerOpened}
          onDrawerClose={this.handleDrawerClosed}
        >
          <Navigator
            initialRoute={routes.WELCOME}
            renderScene={this.renderScene}
            navigationBar={navigationBar}
          />
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
    backgroundColor: 'rgb(0, 188, 212)',
  },
  navTitle: {
    color: 'white',
    marginVertical: 15,
    fontWeight: '500',
    fontSize: 16,
  },
})

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMember,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
