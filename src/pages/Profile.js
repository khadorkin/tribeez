import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import ProfileForm from '../forms/Profile'

class Profile extends Component {

  render() {
    return (
      <Card>
        <ProfileForm setHook={this.props.setHook} />
      </Card>
    )
  }

}

Profile.propTypes = {
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(Profile)
