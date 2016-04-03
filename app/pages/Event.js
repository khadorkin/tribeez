import React, {Component, PropTypes} from 'react'

import Card from 'material-ui/lib/card/card'

import EventForm from '../forms/Event'

class Event extends Component {

  render() {
    return (
      <Card>
        <EventForm />
      </Card>
    )
  }

}

export default Event
