import React, {Component, PropTypes} from 'react'
import {ScrollView} from 'react-native'

import TaskForm from '../forms/Task'

class Task extends Component {
  static propTypes = {
    edit: PropTypes.object,
  }

  render() {
    return (
      <ScrollView>
        <TaskForm current={this.props.edit} />
      </ScrollView>
    )
  }
}

export default Task
