import React, {Component} from 'react'

import Card from 'material-ui/lib/card/card'

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
