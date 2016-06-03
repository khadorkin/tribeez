import React, {Component, PropTypes} from 'react'
import {StyleSheet, ScrollView, View} from 'react-native'

import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import TextField from '../components/TextField'
import DateField from '../components/DateField'
import FormattedMessage from '../components/FormattedMessage'
import Button from '../components/Button'

import validator from '../../common/utils/formValidator'

import getEvent from '../../common/actions/getEvent'
import submitEvent from '../../common/actions/submitEvent'

class EventForm extends Component {
  static propTypes = {
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

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitEvent)(event)
  }

  render() {
    const {fields: {name, description, start, end, location, url}, error, submitting} = this.props

    return (
      <ScrollView style={styles.container}>
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
        <View style={styles.actions}>
          <Button
            id={'submit.event.' + (this.props.event.id ? 'update' : 'create')}
            onPress={this.handleSubmit}
            disabled={submitting}
          />
        </View>
        {error && <FormattedMessage id={error} style={{color: 'red'}} />}
      </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  actions: {
    alignItems: 'center',
  },
})

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
  validate: validator.event,
  touchOnBlur: false,
}, mapStateToProps, mapDispatchToProps)(EventForm)
