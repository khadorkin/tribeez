import React from 'react'
const PropTypes = React.PropTypes

import Card from 'material-ui/lib/card/card'

import ProfileForm from '../forms/Profile'

class Profile extends React.Component {

  render() {
    return (
      <Card>
        <ProfileForm />
      </Card>
    )
  }

}

export default Profile
