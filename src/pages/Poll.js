import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import PollForm from '../forms/Poll'

class Poll extends Component {

  render() {
    return (
      <Card>
        <PollForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} setHook={this.props.setHook} />
      </Card>
    )
  }

}

Poll.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(Poll)
