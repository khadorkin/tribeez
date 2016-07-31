import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import Touchable from './Touchable'
import IconButton from './IconButton'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'
import postLogout from '../../common/actions/postLogout'
import putSwitch from '../../common/actions/putSwitch'

const menuEntries = [
  {route: routes.ACTIVITY, icon: 'view-stream'},
  {route: routes.MEMBERS, icon: 'group'},
  {route: routes.BILLS, icon: 'shopping-cart'},
  {route: routes.EVENTS, icon: 'event'},
  {route: routes.TASKS, icon: 'assignment-turned-in'},
  {route: routes.NOTES, icon: 'content-paste'},
  {route: routes.POLLS, icon: 'poll'},
]

class DrawerContent extends Component {
  static propTypes = {
    // from parent component:
    drawer: PropTypes.object,
    opened: PropTypes.bool.isRequired,
    // from redux:
    user: PropTypes.object,
    currentTribe: PropTypes.object,
    // action creators:
    postLogout: PropTypes.func.isRequired,
    putSwitch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      showTribes: false,
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleProfile = this.handleProfile.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleNewTribe = this.handleNewTribe.bind(this)
    this.handleTribeSettings = this.handleTribeSettings.bind(this)
  }

  componentWillReceiveProps(props) {
    if (!props.opened) {
      this.setState({
        showTribes: false,
      })
    }
  }

  handleLogout() {
    this.props.postLogout()
    this.props.drawer.closeDrawer()
  }

  handleProfile() {
    router.resetTo(routes.PROFILE)
    this.props.drawer.closeDrawer()
  }

  handleToggle() {
    this.setState({
      showTribes: !this.state.showTribes,
    })
  }

  handleLink(route) {
    router.resetTo(route)
    this.props.drawer.closeDrawer()
  }

  handleNewTribe() {
    router.resetTo(routes.TRIBE_NEW)
    this.props.drawer.closeDrawer()
  }

  handleTribeSettings() {
    router.resetTo(routes.TRIBE)
    this.props.drawer.closeDrawer()
  }

  handleSwitchTribe(id) {
    if (id !== this.props.currentTribe.id) {
      this.props.putSwitch(id)
      this.props.drawer.closeDrawer()
    }
  }

  render() {
    const {user, currentTribe} = this.props

    const menuItems = menuEntries.map((entry) =>
      <IconButton
        key={entry.route.name}
        name={entry.icon}
        onPress={this.handleLink.bind(this, entry.route)}
      >
        <FormattedMessage style={styles.entry} id={entry.route.name} />
      </IconButton>
    )

    const tribe_ids = Object.keys(user.tribes)
    const tribeItems = tribe_ids.map((tid) =>
      <Touchable key={tid} onPress={this.handleSwitchTribe.bind(this, tid)} style={styles.tribe}>
        <Text style={styles.tribeText}>{user.tribes[tid]}</Text>
        {
          tid === user.current_tribe && (
            <IconButton name="settings" style={styles.tribeSettings} onPress={this.handleTribeSettings} />
          )
        }
      </Touchable>
    )

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actions}>
            <IconButton name="exit-to-app" color="white" onPress={this.handleLogout} style={styles.action} />
            <IconButton name="person" color="white" onPress={this.handleProfile} style={styles.action} />
          </View>
          <View style={styles.infos}>
            <Image
              source={{uri: gravatar(user, 160)}}
              style={styles.avatar}
            />
            <Text style={styles.username}>
              {user.name}
            </Text>
            <Text style={styles.currentTribe}>
              {currentTribe.name}
            </Text>
            <IconButton
              name={this.state.showTribes ? 'arrow-drop-up' : 'arrow-drop-down'}
              color="white"
              onPress={this.handleToggle}
              style={styles.toggle}
            />
          </View>
        </View>

        <ScrollView style={styles.menu}>
          {this.state.showTribes ? tribeItems : menuItems}
        </ScrollView>
        {
          this.state.showTribes && (
            <IconButton name="add" onPress={this.handleNewTribe}>
              <FormattedMessage style={styles.tribeText} id="tribe_new" />
            </IconButton>
          )
        }
      </View>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.user,
  currentTribe: state.tribe,
  lang: state.app.lang, // hack to force update when lang changes
  currency: state.tribe.currency, // hack to force update when currency changes
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
  putSwitch,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.main,
    //paddingTop: 24, // set if DrawerLayoutAndroid has a statusBarBackgroundColor
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    paddingBottom: 0,
  },
  infos: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  username: {
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
    marginVertical: 5,
  },
  currentTribe: {
    color: 'white',
    fontWeight: '400',
    fontSize: 14,
    marginBottom: 10,
  },
  toggle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingBottom: 6,
  },
  menu: {
    flex: 1,
    paddingTop: 6,
  },
  entry: {
    color: colors.primaryText,
    fontWeight: '400',
    paddingVertical: 1,
  },
  tribe: {
    padding: 12,
  },
  tribeText: {
    color: colors.primaryText,
    fontWeight: '400',
    paddingBottom: 1.5,
    marginRight: 30,
  },
  tribeSettings: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
