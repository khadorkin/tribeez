import React, {Component, PropTypes} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import EventForm from '../forms/Event'

class Event extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollViewWithHeader>
        <EventForm current={this.props.edit} />
      </ScrollViewWithHeader>
    )
  }
}

export default Event
