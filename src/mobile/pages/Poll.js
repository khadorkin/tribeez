import React, {Component, PropTypes} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import PollForm from '../forms/Poll'

class Poll extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollViewWithHeader>
        <PollForm current={this.props.edit} />
      </ScrollViewWithHeader>
    )
  }
}

export default Poll
