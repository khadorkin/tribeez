import React, {Component, PropTypes} from 'react'

import {FormattedMessage} from 'react-intl'

import {orange700} from 'material-ui/styles/colors'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import TaskUser from './deep/TaskUser'

import form from '../../common/forms/task'
import focus from '../../common/utils/formFocus'
import getItem from '../../common/actions/getItem'
import submitTask from '../../common/actions/submitTask'

class TaskForm extends Component {
  static propTypes = {
    // from parent component:
    id: PropTypes.string,
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    task: PropTypes.object,
    tid: PropTypes.string,
    users: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired,
    // action creators:
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props) {
    if (!this.subscribed && props.tid) {
      this.props.subscribe('task', props.id)
      this.subscribed = true
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe('task', this.props.id)
  }

  handleSubmit(task) {
    this.props.handleSubmit(submitTask)(task)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, wait, users}, userMap, task} = this.props

    let done = false
    if (task) {
      for (const key in task.counters) {
        if (task.counters[key] > 0) {
          done = true
          break
        }
      }
    }
    const subtitle = (done ? <span style={{color: orange700}}><FormattedMessage id="task_edit_warning" /></span> : null)

    return (
      <Form subtitle={subtitle} name={'task.' + (task ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="name"
          required={true}
          {...name}
          name="title"
        />
        <TextField ref="description"
          multiLine={true}
          {...description}
        />
        <TextField ref="wait"
          required={true}
          type="number"
          step="1"
          min="0"
          max="255"
          {...wait}
        />
        <div style={{margin: '32px 0 16px'}}>
          <FormattedMessage id="field.task_users" />
        </div>
        {
          users.map((task_user, index) =>
            <TaskUser key={index}
              checked={task_user.checked}
              user={userMap[task_user.user_id.value]}
            />
          )
        }
      </Form>
    )
  }
}

export default form(TaskForm, {
  subscribe: getItem.on,
  unsubscribe: getItem.off,
})
