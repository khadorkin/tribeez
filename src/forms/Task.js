import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import {CardActions, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import getTask from '../actions/getTask'
import submitTask from '../actions/submitTask'

class TaskForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (!this.props.task && this.props.id) {
      this.props.getTask(this.props.id)
    }
  }

  componentDidMount() {
    this.props.setHook(() => modified(this.props.fields))
  }

  handleSubmit(task) {
    this.props.handleSubmit(submitTask)(task)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, wait, notice}, error, submitting} = this.props

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
          <TextField ref="wait"
            required={true}
            type="number"
            step="1"
            min="0"
            {...wait}
          />
          <TextField ref="notice"
            required={true}
            type="number"
            step="1"
            min="1"
            {...notice}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.task.' + (this.props.task.id ? 'update' : 'create')} />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
        </CardActions>
      </form>
    )
  }
}

TaskForm.propTypes = {
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
  task: PropTypes.object,
  // action creators:
  getTask: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const task = ownProps.current || state.tasks.current || {} // either from routing state, or from ajax retrieval
  return {
    lang: state.app.lang,
    task,
    initialValues: {
      id: task.id,
      name: task.name,
      description: task.description,
      wait: task.wait,
      notice: task.notice,
    },
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTask,
}, dispatch)

export default reduxForm({
  form: 'task',
  fields: ['id', 'name', 'description', 'wait', 'notice'],
  returnRejectedSubmitPromise: true,
  validate: validator.task,
}, mapStateToProps, mapDispatchToProps)(TaskForm)
