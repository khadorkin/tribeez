import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {IntlProvider} from 'react-intl'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from './FormattedMessage'

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
    lang: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    // action creators:
    postLogout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleProfile = this.handleProfile.bind(this)
  }

  handleLogout() {
    this.props.postLogout()
    this.props.drawer.closeDrawer()
  }

  handleProfile() {
    router.resetTo(routes.PROFILE)
    this.props.drawer.closeDrawer()
  }

  handleLink(route) {
    router.resetTo(route)
    this.props.drawer.closeDrawer()
  }

  render() {
    const menuItems = menuEntries.map((entry) =>
      <Icon.Button
        key={entry.route.name}
        name={entry.icon}
        size={24}
        onPress={this.handleLink.bind(this, entry.route)}
        backgroundColor="white"
        borderRadius={0}
        color={colors.icon}
      >
        <FormattedMessage style={styles.entry} id={entry.route.name} />
      </Icon.Button>
    )

    const {user} = this.props

    return (
      <IntlProvider locale={this.props.lang} messages={this.props.messages}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.actions}>
              <Icon.Button
                name="exit-to-app"
                size={24}
                onPress={this.handleLogout}
                backgroundColor={colors.main}
                color="white"
              />
              <Icon.Button
                name="person"
                size={24}
                onPress={this.handleProfile}
                backgroundColor={colors.main}
                color="white"
              />
            </View>
            <View style={styles.infos}>
              <Image
                source={{uri: gravatar(user, 160)}}
                style={styles.avatar}
              />
              <Text style={styles.username}>
                {user.name}
              </Text>
            </View>
          </View>

          <View style={styles.menu}>
            {menuItems}
          </View>
        </View>
      </IntlProvider>
    )
  }

}

const mapStateToProps = (state) => ({
  user: state.member.user,
  lang: state.app.lang, // here is the app language
  messages: state.app.messages,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    backgroundColor: colors.main,
    height: 200,
    width: 296,
    flexDirection: 'column',
    marginBottom: 10,
    paddingTop: 24, // because DrawerLayoutAndroid has a statusBarBackgroundColor
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infos: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  username: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  menu: {
    flex: 1,
  },
  entry: {
    color: colors.primaryText,
    fontWeight: '400',
    paddingVertical: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
