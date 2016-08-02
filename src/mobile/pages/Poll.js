import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import PollForm from '../forms/Poll'

class Poll extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollView>
        <PollForm current={this.props.edit} />
      </ScrollView>
    )
  }
}

export default Poll
