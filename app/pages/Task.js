import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import TaskForm from '../forms/Task'

class Task extends Component {

  render() {
    return (
      <Card>
        <TaskForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} />
      </Card>
    )
  }

}

Task.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default Task
