import React, {Component} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import ProfileForm from '../forms/Profile'

class Profile extends Component {
  render() {
    return (
      <ScrollViewWithHeader>
        <ProfileForm />
      </ScrollViewWithHeader>
    )
  }
}

export default Profile
