import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import Checkbox from './fields/Checkbox'

import validator, {focus} from '../../common/utils/formValidator'

import getPoll from '../../common/actions/getPoll'
import submitPoll from '../../common/actions/submitPoll'

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
    const {fields: {name, description, multiple, options}} = this.props

    return (
      <Form name={'poll.' + (this.props.poll ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
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
      </Form>
    )
  }
}

PollForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
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
      description: poll.description || '',
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
