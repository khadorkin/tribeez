import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import ProfileForm from '../forms/Profile'

class Profile extends Component {
  static propTypes = {
    // from withHook:
    setHook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Card>
        <ProfileForm setHook={this.props.setHook} />
      </Card>
    )
  }
}

export default withHook(Profile)
