import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

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
      <ListItem user={user} onPress={this.handlePress}>
        <Text style={styles.title}>{user.name}</Text>
        <FormattedMessage id="member_since" values={{when: member.joined}} style={styles.subtitle} />
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
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
