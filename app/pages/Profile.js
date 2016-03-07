import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

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
