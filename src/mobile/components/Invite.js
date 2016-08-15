import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, Alert} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import colors from '../../common/constants/colors'
import postInvite from '../../common/actions/postInvite'

class Invite extends Component {
  static propTypes = {
    // from parent:
    invite: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    // action creators:
    postInvite: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleResend = this.handleResend.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleResend() {
    Alert.alert(this.props.messages.dialog_reinvite, this.props.invite.email, [
      {text: this.props.messages.cancel},
      {text: this.props.messages.send, onPress: this.handleConfirm},
    ])
  }

  handleConfirm() {
    this.props.postInvite(this.props.invite)
  }

  render() {
    const {userMap, invite} = this.props

    const inviter = userMap[invite.inviter]
    if (!inviter) {
      return null
    }

    return (
      <ListItem user={inviter} icon="refresh" onIconPress={this.handleResend} rightLabel={<FormattedRelative value={invite.invited} style={styles.time} />}>
        <Text style={styles.title}>{invite.email}</Text>
        <FormattedMessage id="invited_by" values={{user: inviter.name, ago: invite.invited}} style={styles.subtitle} />
      </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.members,
  },
  subtitle: {
    color: colors.secondaryText,
    fontStyle: 'italic',
    marginTop: 16,
  },
  time: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  messages: state.app.messages, //TODO
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Invite)
