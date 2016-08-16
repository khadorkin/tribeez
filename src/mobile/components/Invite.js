import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'
import FormattedRelative from './FormattedRelative'

import colors from '../../common/constants/colors'
import postInvite from '../../common/actions/postInvite'
import {alert} from '../../common/actions/app'

class Invite extends Component {
  static propTypes = {
    // from parent:
    invite: PropTypes.object.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired,
    // action creators:
    postInvite: PropTypes.func.isRequired,
    alert: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleResend = this.handleResend.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  handleResend() {
    this.props.alert({
      title_id: 'dialog_reinvite',
      text: this.props.invite.email,
      buttons: [
        {text_id: 'cancel'},
        {text_id: 'send', onPress: this.handleConfirm},
      ],
    })
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
        <FormattedMessage id="invited_by" values={{user: inviter.name}} style={styles.subtitle} />
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
  alert,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Invite)
