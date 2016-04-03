import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'
import DatePicker from './fields/Date'

import styles from '../constants/styles'

import validator from '../utils/formValidator'

import submitEvent from '../actions/submitEvent'

const now = Date.now()

class EventForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitEvent)(event)
      .catch((errors) => {
        const field = Object.keys(errors)[0]
        if (field !== '_error') {
          this.refs[field].focus()
        }
      })
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
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label="Create event" type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

EventForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  initialValues: PropTypes.object,
  lang: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  initialValues: {
    start: now,
  },
  lang: state.app.lang,
})

export default reduxForm({
  form: 'event',
  fields: ['id', 'name', 'description', 'start', 'end', 'location', 'url'],
  returnRejectedSubmitPromise: true,
  validate: validator.event,
}, mapStateToProps)(EventForm)
