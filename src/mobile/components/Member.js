import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import Touchable from './Touchable'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Member extends Component {
  static propTypes = {
    // from parent:
    user: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.MEMBER
    route.props = {
      id: this.props.user.uid,
    }
    route.title = this.props.user.name
    router.push(route)
  }

  render() {
    const {user, userMap} = this.props
    const member = userMap[user.uid]

    if (!member) {
      return null
    }

    return (
      <View style={styles.container}>
        <Touchable onPress={this.handlePress} style={styles.main}>
          <Image
            source={{uri: gravatar(user)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{user.name}</Text>
            <FormattedMessage id="member_since" values={{when: member.joined}} style={styles.subtitle} />
          </View>
        </Touchable>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    marginVertical: 5,
    elevation: 1,
  },
  main: {
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(Member)
