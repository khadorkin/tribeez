import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import DateField from './fields/Date'

import form from '../../common/forms/event'
import submitEvent from '../../common/actions/submitEvent'

class EventForm extends Component {
  static propTypes = {
    // from parent:
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    event: PropTypes.object,
  }

  render() {
    const {fields: {name, description, start, end, location, url}, ...props} = this.props

    return (
      <Form name={'event.' + (this.props.event ? 'update' : 'create')} action={submitEvent} {...props}>
        <TextField ref="name"
          {...name}
          name="title"
        />
        <DateField ref="start"
          time={true}
          {...start}
        />
        <DateField ref="end"
          time={true}
          {...end}
        />
        <TextField ref="location"
          {...location}
        />
        <TextField ref="description"
          multiline={true}
          {...description}
        />
        <TextField ref="url"
          {...url}
        />
      </Form>
    )
  }
}

export default form(EventForm)
