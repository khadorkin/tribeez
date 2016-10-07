import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field, FieldArray} from 'redux-form'
import TextField from './fields/Text'
import TaskUsers from './fields/TaskUsers'

import form from '../../common/forms/task'
import submitTask from '../../common/actions/submitTask'

class TaskForm extends Component {
  static propTypes = {
    // from redux:
    task: PropTypes.object,
  }

  render() {
    const {task, ...props} = this.props

    return (
      <ScrollView>
        <Form name={'task.' + (task ? 'update' : 'create')} action={submitTask} {...props}>
          <Field
            name="name"
            labelId="title"
            component={TextField}
          />
          <Field
            name="description"
            component={TextField}
            multiline={true}
          />
          <Field
            name="wait"
            component={TextField}
            keyboardType="numeric"
          />
          <FieldArray
            name="users"
            component={TaskUsers}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(TaskForm)
