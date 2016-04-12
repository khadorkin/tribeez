import React from 'react'
const PropTypes = React.PropTypes
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'
import DatePicker from './fields/Date'

import styles from '../constants/styles'

import validator, {focus} from '../utils/formValidator'

import getEvent from '../actions/getEvent'
import submitEvent from '../actions/submitEvent'

const now = Date.now()

class EventForm extends React.Component {

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
    const {fields: {name, description, start, end, location, url}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="name"
            required={true}
            floatingLabelText="Name"
            errorText={name.touched && name.error && <FormattedMessage id="error.name" />}
            {...name}
          />
          <DatePicker ref="start"
            required={true}
            locale={this.props.lang}
            time={true}
            floatingLabelText="Start date"
            timeLabel="Start time (optional)"
            errorText={start.touched && start.error && <FormattedMessage id="error.start" />}
            {...start}
          />
          <DatePicker ref="end"
            locale={this.props.lang}
            time={true}
            floatingLabelText="End date (optional)"
            timeLabel="End time (optional)"
            errorText={end.touched && end.error && <FormattedMessage id="error.end" />}
            {...end}
          />
          <TextField ref="location"
            floatingLabelText="Location (optional)"
            errorText={location.touched && location.error && <FormattedMessage id="error.location" />}
            {...location}
          />
          <TextField ref="description"
            multiLine={true}
            floatingLabelText="Description (optional)"
            errorText={description.touched && description.error && <FormattedMessage id="error.description" />}
            {...description}
          />
          <TextField ref="url"
            floatingLabelText="URL (optional)"
            errorText={url.touched && url.error && <FormattedMessage id="error.url" />}
            {...url}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={this.props.event ? 'Update event' : 'Add event'} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

EventForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  lang: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  event: PropTypes.object,
  // action creators:
  getEvent: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const event = ownProps.current || state.events.current // either from routing state, or from ajax retrieval
  let initialValues
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      description: event.description,
      start: event.start,
      end: event.end,
      location: event.location,
      url: event.url,
    }
  } else {
    initialValues = {}
  }
  return {
    lang: state.app.lang,
    initialValues,
    event,
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
