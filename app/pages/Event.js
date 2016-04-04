import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

import EventForm from '../forms/Event'

class Event extends Component {

  render() {
    return (
      <Card>
        <EventForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} />
      </Card>
    )
  }

}

Event.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Event
