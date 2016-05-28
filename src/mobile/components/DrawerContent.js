import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'

import postLogout from '../../common/actions/postLogout'

import gravatar from '../../common/utils/gravatar'

const menuEntries = [
  {route: routes.ACTIVITY, icon: 'view-stream'},
]

class DrawerContent extends Component {
  static propTypes = {
    // from parent component:
    drawer: PropTypes.object,
    // from redux:
    user: PropTypes.object,
    // action creators:
    postLogout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.postLogout()
    this.props.drawer.closeDrawer()
  }

  handleLink(route) {
    router.push(route)
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
        color="rgb(117, 117, 117)"
      >
        <FormattedMessage style={styles.entry} id={entry.route.name} />
      </Icon.Button>
    )

    const {user} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.actions}>
            <Icon.Button
              name="exit-to-app"
              size={24}
              onPress={this.handleLogout}
              backgroundColor="rgb(0, 188, 212)"
              color="white"
            />
            <Icon.Button
              name="person"
              size={24}
              onPress={this.handleProfile} // TODO
              backgroundColor="rgb(0, 188, 212)"
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
    )
  }

}

const mapStateToProps = (state) => ({
  menu_tribes: state.app.menu_tribes,
  height: state.app.height,
  tribe_name: state.member.tribe.name,
  user: state.member.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogout,
}, dispatch)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    backgroundColor: 'rgb(0, 188, 212)',
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
    color: 'rgba(0, 0, 0, 0.87)',
    fontWeight: '400',
    paddingVertical: 1,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent)
