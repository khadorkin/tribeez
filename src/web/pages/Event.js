import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import EventForm from '../forms/Event'

class Event extends Component {
  static propTypes = {
    // from react-router:
    params: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    // from withHook:
    setHook: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Card>
        <EventForm id={this.props.params.id} current={this.props.location.state} setHook={this.props.setHook} />
      </Card>
    )
  }
}

export default withHook(Event)
