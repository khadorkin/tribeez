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
  }

  render() {
    const {fields: {name, description, wait, notice, users}, ...props} = this.props

    const usersById = {}
    this.props.users.forEach((user) => {
      usersById[user.id] = user
    })

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
        <TextField ref="notice"
          keyboardType="numeric"
          {...notice}
        />
        {
          users.map((task_user, index) =>
            <TaskUser key={index}
              checked={task_user.checked}
              user={usersById[task_user.user_id.value]}
            />
          )
        }
      </Form>
    )
  }
}

export default form(TaskForm)
