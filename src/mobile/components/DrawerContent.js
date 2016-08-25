import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, ScrollView, Text, TouchableHighlight} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Avatar from './Avatar'
import FormattedMessage from './FormattedMessage'
import FormattedNumber from './FormattedNumber'
import Touchable from './Touchable'
import IconButton from './IconButton'
import FormButton from './FormButton'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
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
    balance: PropTypes.number,
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
    this.handleEditTribe = this.handleEditTribe.bind(this)
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
    router.resetTo(routes.MEMBERS_EDIT)
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
    const route = routes.TRIBE_NEW
    route.props = {
      type: 'create',
    }
    router.resetTo(route)
    this.props.drawer.closeDrawer()
  }

  handleEditTribe() {
    const route = routes.TRIBE_EDIT
    route.props = {
      type: 'update',
    }
    router.resetTo(route)
    this.props.drawer.closeDrawer()
  }

  handleSwitchTribe(id) {
    if (id !== this.props.currentTribe.id) {
      this.props.putSwitch(id)
      this.props.drawer.closeDrawer()
    }
  }

  render() {
    const {user, balance, currentTribe} = this.props

    // first route in stack == current menu entry \o/
    // works because router.resetTo is called when clicking an entry
    const currentRoute = router.getRoute().name

    const extras = {
      'bills': <FormattedNumber value={balance} format="money" sign={true} style={balance < 0 ? styles.negativeBalance : styles.positiveBalance} />,
    }

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
          {extras[route.name]}
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
              <IconButton color={colors.main} name="settings" onPress={this.handleEditTribe} />
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
              <Avatar user={user} size={80} />
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
            <FormButton id="tribe_new" onPress={this.handleNewTribe} />
          )
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ///////////////////////// HEADER /////////////////////////
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
  ////////////////////////// MENU //////////////////////////
  menu: {
    flex: 1,
    backgroundColor: colors.background,
  },
  entry: {
    borderLeftColor: colors.background, // overwritten when current entry
    borderLeftWidth: 8,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: 'center',
  },
  entryText: {
    // color is handled in render
    fontWeight: '400',
    fontSize: 15,
    flex: 1,
  },
  positiveBalance: {
    color: colors.positive,
  },
  negativeBalance: {
    color: colors.error,
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

const mapStateToProps = (state) => {
  const member = state.user.uid && state.tribe.userMap[state.user.uid]
  return {
    user: state.user,
    balance: member && member.balance,
    currentTribe: state.tribe,
    lang: state.app.lang, // hack to force update when lang changes
    currency: state.tribe.currency, // hack to force update when currency changes
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
  putSwitch,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
