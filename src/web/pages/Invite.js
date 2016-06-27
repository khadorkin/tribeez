import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import InviteForm from '../forms/Invite'

class Invite extends Component {
  static propTypes = {
    // from withHook:
    setHook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Card>
        <InviteForm setHook={this.props.setHook} />
      </Card>
    )
  }
}

export default withHook(Invite)
