import React, {Component, PropTypes} from 'react'

import Details from '../hoc/Details'

import {getTimestamp} from '../../common/utils/time'

class EventDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
  }

  mapper(event, userMap) {
    const date = getTimestamp(event.start)
    const suffix = (typeof event.start === 'string') ? '' : 'time'

    //TODO: show end time if end type is time (number) even if start type is date (string)

    return [
      {
        id: 'author',
        icon: 'person',
        message: 'created_by',
        values: {author: userMap[event.author].name},
      },
      {
        id: 'description',
        icon: 'description',
        text: event.description,
      },
      {
        id: 'start',
        icon: 'schedule',
        message: event.end ? ('interval' + suffix) : ('date' + suffix),
        values: event.end ? {start: date, end: getTimestamp(event.end)} : {date},
      },
      {
        id: 'location',
        icon: 'place',
        url: event.location && 'https://www.google.com/maps?q=' + encodeURIComponent(event.location),
        text: event.location,
      },
      {
        id: 'url',
        icon: 'link',
        url: event.url,
        text: event.url && event.url.replace(/^(https?:\/\/|)(www\.|)/, ''),
      },
    ]
  }

  render() {
    return (
      <Details type="event" id={this.props.id} mapper={this.mapper} />
    )
  }
}

export default EventDetails
