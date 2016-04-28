import React, {Component, PropTypes} from 'react'

import {Card} from 'material-ui/Card'

import withHook from '../hoc/withHook'
import TaskForm from '../forms/Task'

class Task extends Component {

  render() {
    return (
      <Card>
        <TaskForm id={this.props.params.id ? Number(this.props.params.id) : null} current={this.props.location.state} setHook={this.props.setHook} />
      </Card>
    )
  }

}

Task.propTypes = {
  // from react-router:
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // from withHook:
  setHook: PropTypes.func.isRequired,
}

export default withHook(Task)
