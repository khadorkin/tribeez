import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'

import colors from '../../common/constants/colors'

class Invite extends Component {
  static propTypes = {
    // from parent:
    invite: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
  }

  render() {
    const {users, invite} = this.props

    const inviter = users.find((user) => user.id === invite.inviter_id)
    if (!inviter) {
      return null
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{invite.email}</Text>
        <FormattedMessage id="invited_by" values={{user: inviter.name, when: invite.invited}} style={styles.subtitle} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 5,
    padding: 10,
    elevation: 1,
  },
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Invite)
