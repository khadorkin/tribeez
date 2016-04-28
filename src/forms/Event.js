import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import {CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import DatePicker from './fields/Date'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import getEvent from '../actions/getEvent'
import submitEvent from '../actions/submitEvent'

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

  componentDidMount() {
    this.props.setHook(() => modified(this.props.fields))
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
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.event.' + (this.props.event.id ? 'update' : 'create')} />} type="submit" disabled={submitting} />
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
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
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
