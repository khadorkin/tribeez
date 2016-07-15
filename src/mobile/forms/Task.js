import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import TaskUser from './deep/TaskUser'

import form from '../../common/forms/task'
import submitTask from '../../common/actions/submitTask'

class TaskForm extends Component {
  static propTypes = {
    // from parent:
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    task: PropTypes.object,
    users: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired,
  }

  render() {
    const {fields: {name, description, wait, users}, userMap, ...props} = this.props

    return (
      <Form name={'task.' + (this.props.task ? 'update' : 'create')} action={submitTask} {...props}>
        <TextField
          {...name}
          name="title"
        />
        <TextField
          multiline={true}
          {...description}
        />
        <TextField ref="wait"
          keyboardType="numeric"
          {...wait}
        />
        {
          users.map((task_user, index) =>
            <TaskUser key={index}
              checked={task_user.checked}
              user={userMap[task_user.uid.value]}
            />
          )
        }
      </Form>
    )
  }
}

export default form(TaskForm)
