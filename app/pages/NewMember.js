import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import InviteForm from '../forms/Invite'

class NewMember extends React.Component {

  render() {
    return (
      <Card>
        <InviteForm />
      </Card>
    )
  }

}

export default NewMember
