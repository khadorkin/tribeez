import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import DateField from './fields/Date'

import validator from '../../common/utils/formValidator'

import submitEvent from '../../common/actions/submitEvent'

class EventForm extends Component {
  static propTypes = {
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    lang: PropTypes.string.isRequired,
    initialValues: PropTypes.object,
    event: PropTypes.object,
  }

  render() {
    const {fields: {name, description, start, end, location, url}, ...props} = this.props

    return (
      <Form name={'event.' + (this.props.event.id ? 'update' : 'create')} action={submitEvent} {...props}>
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

const mapStateToProps = (state, ownProps) => {
  const event = ownProps.current || state.events.current || {} // either from routing state, or from ajax retrieval
  return {
    lang: state.app.lang,
    event,
    initialValues: {
      id: event.id,
      name: event.name,
      description: event.description,
      start: event.start,
      end: event.end,
      location: event.location,
      url: event.url,
    },
  }
}

export default reduxForm({
  form: 'event',
  fields: ['id', 'name', 'description', 'start', 'end', 'location', 'url'],
  validate: validator.event,
  touchOnBlur: false,
}, mapStateToProps)(EventForm)
