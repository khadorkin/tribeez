import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field} from 'redux-form'
import TextField from './fields/Text'
import DateField from './fields/Date'
import SelectField from './fields/Select'

import form from '../../common/forms/event'
import submitEvent from '../../common/actions/submitEvent'

import {REMINDERS} from '../../common/constants/product'

const reminders = REMINDERS.map((code) => ({code}))

class EventForm extends Component {
  static propTypes = {
    // from redux:
    event: PropTypes.object,
  }

  render() {
    const {event, ...props} = this.props

    return (
      <ScrollView>
        <Form name={'event.' + (event ? 'update' : 'create')} action={submitEvent} {...props}>
          <Field
            name="name"
            labelId="title"
            component={TextField}
          />
          <Field
            name="start"
            component={DateField}
            time={true}
          />
          <Field
            name="end"
            component={DateField}
            time={true}
          />
          <Field
            name="location"
            component={TextField}
          />
          <Field
            name="description"
            component={TextField}
            multiline={true}
          />
          <Field
            name="url"
            component={TextField}
          />
          <Field
            name="reminder"
            component={SelectField}
            items={reminders}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(EventForm)
