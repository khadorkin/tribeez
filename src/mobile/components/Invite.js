import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, Alert} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import FormattedMessage from './FormattedMessage'
import IconButton from './IconButton'

import colors from '../../common/constants/colors'
import postInvite from '../../common/actions/postInvite'

class Invite extends Component {
  static propTypes = {
    // from parent:
    item: PropTypes.object.isRequired,
    // from redux:
    uid: PropTypes.number,
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
    Alert.alert(this.props.messages.dialog_reinvite, this.props.item.email, [
      {text: this.props.messages.cancel},
      {text: this.props.messages.send, onPress: this.handleConfirm},
    ])
  }

  handleConfirm() {
    const {item, uid} = this.props
    this.props.postInvite(item.email, item.lang, uid) //TODO: show loader
  }

  render() {
    const {userMap, item} = this.props

    const inviter = userMap[item.inviter_id]
    if (!inviter) {
      return null
    }

    return (
      <View style={styles.container}>
        <View style={styles.titles}>
          <Text style={styles.title}>{item.email}</Text>
          <Text style={styles.subtitle}>
            <FormattedMessage id="invited_by" values={{user: inviter.name}} relative={{when: item.invited}} />
          </Text>
        </View>
        <IconButton name="refresh" onPress={this.handleResend} style={styles.icon} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1,
    padding: 10,
    flexDirection: 'row',
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
  icon: {
    paddingVertical: 6,
  },
})

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  userMap: state.member.tribe.userMap,
  messages: state.app.messages, //TODO
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Invite)
