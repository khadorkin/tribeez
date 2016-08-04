import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import DatePicker from './fields/Date'
import SelectField from './fields/Select'

import form from '../../common/forms/event'
import focus from '../../common/utils/formFocus'
import listenItem from '../../common/actions/listenItem'
import submitEvent from '../../common/actions/submitEvent'

import {REMINDERS} from '../../common/constants/product'

const reminder_items = REMINDERS.map((item) =>
  <MenuItem value={item} primaryText={<FormattedMessage id={'select.' + item} />} />
)

class EventForm extends Component {
  static propTypes = {
    // from parent component:
    id: PropTypes.string,
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    event: PropTypes.object,
    tid: PropTypes.string,
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
      this.props.subscribe('event', props.id)
      this.subscribed = true
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe('event', this.props.id)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitEvent)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, start, end, location, url, reminder}} = this.props

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
        <SelectField ref="reminder"
          {...reminder}
        >
          {reminder_items}
        </SelectField>
      </Form>
    )
  }
}

export default form(EventForm, {
  subscribe: listenItem.on,
  unsubscribe: listenItem.off,
})
