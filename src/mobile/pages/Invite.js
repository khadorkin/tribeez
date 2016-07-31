import React, {Component} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import InviteForm from '../forms/Invite'

class Invite extends Component {
  render() {
    return (
      <ScrollViewWithHeader>
        <InviteForm />
      </ScrollViewWithHeader>
    )
  }
}

export default Invite
