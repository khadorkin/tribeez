import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import EventForm from '../forms/Event'

class Event extends Component {

  render() {
    return (
      <Card>
        <EventForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} setHook={this.props.setHook} />
      </Card>
    )
  }

}

Event.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(Event)
