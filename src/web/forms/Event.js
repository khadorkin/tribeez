import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import DatePicker from './fields/Date'

import form from '../../common/forms/event'
import focus from '../../common/utils/formFocus'
import getEvent from '../../common/actions/getEvent'
import submitEvent from '../../common/actions/submitEvent'

class EventForm extends Component {
  static propTypes = {
    // from parent component:
    id: PropTypes.number,
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    event: PropTypes.object,
    // action creators:
    getEvent: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // when accessing directly to /event/:key
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
      <Form name={'event.' + (this.props.event ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
        <TextField ref="name"
          required={true}
          {...name}
          name="title"
        />
        <DatePicker ref="start"
          required={true}
          time={true}
          {...start}
        />
        <DatePicker ref="end"
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

export default form(EventForm, {getEvent})
