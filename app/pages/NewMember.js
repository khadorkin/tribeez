import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

import InviteForm from '../forms/Invite'

class NewMember extends Component {

  render() {
    return (
      <Card>
        <InviteForm />
      </Card>
    )
  }

}

export default NewMember
