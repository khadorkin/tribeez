import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, ScrollView, Text, Image, TouchableHighlight} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import Touchable from './Touchable'
import IconButton from './IconButton'
import Button from './Button'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'
import postLogout from '../../common/actions/postLogout'
import putSwitch from '../../common/actions/putSwitch'

const menuEntries = [
  routes.MEMBERS,
  routes.BILLS,
  routes.EVENTS,
  routes.TASKS,
  routes.NOTES,
  routes.POLLS,
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

    // first route in stack == current menu entry \o/
    // works because router.resetTo is called when clicking an entry
    const currentRoute = router.getRoute().name

    const menuItems = menuEntries.map((route) => {
      const color = colors[route.name]
      const isCurrent = (currentRoute === route.name)

      return (
        <IconButton
          key={route.name}
          name={route.icon}
          onPress={this.handleLink.bind(this, route)}
          color={color}
          style={[styles.entry, {borderLeftColor: (isCurrent ? color : colors.background)}]}
        >
          <FormattedMessage style={[styles.entryText, {color: isCurrent ? color : colors.primaryText}]} id={route.name} />
        </IconButton>
      )
    })

    const tribe_ids = Object.keys(user.tribes)
    const tribeItems = tribe_ids.map((tid) => {
      const isCurrent = (tid === user.current_tribe)
      const color = isCurrent ? colors.main : colors.primaryText

      return (
        <Touchable key={tid} onPress={this.handleSwitchTribe.bind(this, tid)} style={styles.tribe}>
          <Text style={[styles.tribeText, {color}]}>{user.tribes[tid]}</Text>
          {
            isCurrent && (
              <IconButton color={colors.main} name="settings" onPress={this.handleTribeSettings} />
            )
          }
        </Touchable>
      )
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.infos}>
            <TouchableHighlight
              onPress={this.handleProfile}
              style={styles.avatar}
              underlayColor={colors.secondaryText}
            >
              <Image
                source={{uri: gravatar(user, 160)}}
                style={styles.avatarImage}
              />
            </TouchableHighlight>
            <View style={styles.member}>
              <Text style={styles.username}>
                {user.name}
              </Text>
              <View style={styles.currentTribeContainer}>
                <Text style={styles.currentTribe}>
                  {currentTribe.name}
                </Text>
                <IconButton
                  name={this.state.showTribes ? 'arrow-drop-up' : 'arrow-drop-down'}
                  color={colors.lightText}
                  onPress={this.handleToggle}
                  style={styles.toggle}
                  size={24}
                />
              </View>
            </View>
          </View>
          <IconButton
            name="home"
            color={colors.lightText}
            onPress={this.handleLink.bind(this, routes.ACTIVITY)}
            style={styles.home}
          />
          <IconButton
            name="exit-to-app"
            size={20}
            color={colors.lightText}
            onPress={this.handleLogout}
            style={styles.logout}
          />
        </View>

        <ScrollView style={styles.menu}>
          {this.state.showTribes ? tribeItems : menuItems}
        </ScrollView>
        {
          this.state.showTribes && (
            <Button id="tribe_new" onPress={this.handleNewTribe} />
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
    //paddingTop: 24, // add space here if status bar's background color is visible
  },
  infos: {
    flexDirection: 'row',
    minHeight: 150,
  },
  avatar: {
    borderRadius: 40,
    margin: 16,
    alignSelf: 'center',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  member: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    color: colors.lightText,
    fontWeight: '400',
    fontSize: 18,
    marginTop: 8,
    marginBottom: -8,
    marginRight: 8,
  },
  currentTribeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentTribe: {
    flex: 1,
    marginTop: 10,
    color: colors.lightText,
    fontWeight: '400',
    fontSize: 14,
  },
  toggle: {
    marginTop: -2,
    alignSelf: 'center',
  },
  home: {
    alignSelf: 'flex-start',
    marginTop: -12,
    marginLeft: 8, // == entry.borderLeftWidth
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //////////////////////////////////////////////////
  menu: {
    flex: 1,
  },
  entry: {
    borderLeftColor: colors.background, // overwritten when current entry
    borderLeftWidth: 8,
    paddingVertical: 16,
  },
  entryText: {
    // color is handled in render
    fontWeight: '400',
    fontSize: 15,
    marginVertical: 3,
  },
  tribe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 62.5,
  },
  tribeText: {
    color: colors.primaryText,
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 20,
    marginRight: 40,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
