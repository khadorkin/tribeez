import React, {Component} from 'react'

import {Card} from 'material-ui/Card'

import ProfileForm from '../forms/Profile'

class Profile extends Component {

  render() {
    return (
      <Card>
        <ProfileForm />
      </Card>
    )
  }

}

export default Profile
