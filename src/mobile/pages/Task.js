import React, {Component, PropTypes} from 'react'

import ScrollViewWithHeader from '../hoc/ScrollViewWithHeader'
import TaskForm from '../forms/Task'

class Task extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollViewWithHeader>
        <TaskForm current={this.props.edit} />
      </ScrollViewWithHeader>
    )
  }
}

export default Task
