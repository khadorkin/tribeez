import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Image} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'

import FormattedMessage from './FormattedMessage'
import IconButton from './IconButton'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'
import postLogout from '../../common/actions/postLogout'

const menuEntries = [
  {route: routes.ACTIVITY, icon: 'view-stream'},
  {route: routes.MEMBERS, icon: 'group'},
  {route: routes.EVENTS, icon: 'event'},
]

class DrawerContent extends Component {
  static propTypes = {
    // from parent component:
    drawer: PropTypes.object,
    // from redux:
    user: PropTypes.object,
    currentTribe: PropTypes.object,
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    // action creators:
    postLogout: PropTypes.func.isRequired,
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
    //
  }

  handleTribeSettings() {
    //
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

    const tribeItems = user.tribes.map((tribe) =>
      <TouchableOpacity key={tribe.id} style={styles.tribe}>
        <Text style={styles.tribeText}>{tribe.name}</Text>
        {
          !!tribe.active && (
            <IconButton name="settings" style={styles.tribeSettings} onPress={this.handleTribeSettings} />
          )
        }
      </TouchableOpacity>
    )

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
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
      </IntlProvider>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.member.user,
  currentTribe: state.member.tribe,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.main,
    paddingTop: 24, // because DrawerLayoutAndroid has a statusBarBackgroundColor
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
