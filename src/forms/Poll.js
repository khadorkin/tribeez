import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import {CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import Checkbox from './fields/Checkbox'

import styles from '../constants/styles'

import validator, {focus} from '../utils/formValidator'

import getPoll from '../actions/getPoll'
import submitPoll from '../actions/submitPoll'

class PollForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (!this.props.poll && this.props.id) {
      this.props.getPoll(this.props.id)
    }
  }

  handleSubmit(poll) {
    this.props.handleSubmit(submitPoll)(poll)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, multiple, options}, error, submitting} = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="name"
            required={true}
            {...name}
            name="title"
          />
          <TextField ref="description"
            multiLine={true}
            {...description}
          />
          {
            options.map((option, index) => {
              return (
                <TextField key={index}
                  {...option}
                  name="option"
                />
              )
            })
          }
          <Checkbox ref="multiple"
            {...multiple}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.poll.' + (this.props.poll ? 'update' : 'create')} />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id={'error.' + error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

PollForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  lang: PropTypes.string.isRequired,
  initialValues: PropTypes.object,
  poll: PropTypes.object,
  // action creators:
  getPoll: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const poll = ownProps.current || state.polls.current // either from routing state, or from ajax retrieval
  let initialValues
  if (poll) {
    const options = poll.options.map((option) => option.name)
    options.push('') // update poll => add an empty option to be able to add options
    initialValues = {
      id: poll.id,
      name: poll.name,
      description: poll.description,
      multiple: Boolean(poll.multiple),
      options,
    }
  } else {
    initialValues = {
      multiple: false,
      options: ['', ''], // new poll => two empty options
    }
  }
  return {
    lang: state.app.lang,
    initialValues,
    poll,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPoll,
}, dispatch)

export default reduxForm({
  form: 'poll',
  fields: ['id', 'name', 'description', 'multiple', 'options[]'],
  returnRejectedSubmitPromise: true,
  validate: validator.poll,
}, mapStateToProps, mapDispatchToProps)(PollForm)
