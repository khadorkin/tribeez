import React, {Component, PropTypes} from 'react'
import {ScrollView} from 'react-native'

import EventForm from '../forms/Event'

class Event extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollView>
        <EventForm current={this.props.edit} />
      </ScrollView>
    )
  }

}

export default Event