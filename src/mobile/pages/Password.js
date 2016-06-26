import React, {Component, PropTypes} from 'react'
import {View, Alert, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import routes from '../../common/routes'
import router from '../../common/router'

import PasswordForm from '../forms/Password'

class Password extends Component {
  static propTypes = {
    // from redux:
    messages: PropTypes.object.isRequired,
    sent: PropTypes.bool.isRequired,
  }

  componentWillReceiveProps(props) {
    if (props.sent) {
      Alert.alert(props.messages.sent_reset, props.messages.sent_reset_more, [
        {text: 'OK', onPress: this.handleClose},
      ])
    }
  }

  handleClose() {
    router.resetTo(routes.WELCOME)
  }

  render() {
    return (
      <View style={styles.container}>
        <PasswordForm />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
})

const mapStateToProps = (state) => ({
  messages: state.app.messages, //TODO
  sent: state.password.sent,
})

export default connect(mapStateToProps)(Password)
