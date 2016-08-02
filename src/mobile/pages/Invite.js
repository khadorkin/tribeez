import React, {Component} from 'react'

import ScrollView from '../hoc/ScrollView'
import InviteForm from '../forms/Invite'

class Invite extends Component {
  render() {
    return (
      <ScrollView>
        <InviteForm />
      </ScrollView>
    )
  }
}

export default Invite
