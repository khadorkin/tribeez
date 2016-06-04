import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import DatePicker from './fields/Date'

import validator, {focus} from '../../common/utils/formValidator'

import getEvent from '../../common/actions/getEvent'
import submitEvent from '../../common/actions/submitEvent'

class EventForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (!this.props.event && this.props.id) {
      this.props.getEvent(this.props.id)
    }
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitEvent)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, start, end, location, url}} = this.props

    return (
      <Form name={'event.' + (this.props.event.id ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="name"
          required={true}
          {...name}
          name="title"
        />
        <DatePicker ref="start"
          required={true}
          locale={this.props.lang}
          time={true}
          {...start}
        />
        <DatePicker ref="end"
          locale={this.props.lang}
          time={true}
          {...end}
        />
        <TextField ref="location"
          {...location}
        />
        <TextField ref="description"
          multiLine={true}
          {...description}
        />
        <TextField ref="url"
          {...url}
        />
      </Form>
    )
  }
}

EventForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  lang: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  event: PropTypes.object,
  // action creators:
  getEvent: PropTypes.func.isRequired,
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

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getEvent,
}, dispatch)

export default reduxForm({
  form: 'event',
  fields: ['id', 'name', 'description', 'start', 'end', 'location', 'url'],
  returnRejectedSubmitPromise: true,
  validate: validator.event,
}, mapStateToProps, mapDispatchToProps)(EventForm)
