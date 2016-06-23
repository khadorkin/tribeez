import React, {Component} from 'react'
import {ScrollView} from 'react-native'

import InviteForm from '../forms/Invite'

class Invite extends Component {
  render() {
    return (
      <ScrollView keyboardShouldPersistTaps={true}>
        <InviteForm />
      </ScrollView>
    )
  }
}

export default Invite
