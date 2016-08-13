import React, {Component, PropTypes} from 'react'

import Details from '../hoc/Details'

class PollDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
  }

  mapper(poll, userMap) {
    return [
      {
        id: 'author',
        icon: 'person',
        message: 'created_by',
        values: {author: userMap[poll.author].name},
      },
      {
        id: 'description',
        icon: 'description',
        text: poll.description,
      },
    ]
  }

  render() {
    return (
      <Details type="poll" id={this.props.id} mapper={this.mapper} />
    )
  }
}

export default PollDetails
