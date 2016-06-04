import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import InviteForm from '../forms/Invite'

class Invite extends Component {

  render() {
    return (
      <Card>
        <InviteForm setHook={this.props.setHook} />
      </Card>
    )
  }

}

Invite.propTypes = {
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(Invite)
