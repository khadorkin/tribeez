import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import InviteForm from '../forms/Invite'

class NewMember extends Component {

  render() {
    return (
      <Card>
        <InviteForm setHook={this.props.setHook} />
      </Card>
    )
  }

}

NewMember.propTypes = {
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(NewMember)
