import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SwitchField from './fields/Switch'

import validator from '../../common/utils/formValidator'

import submitPoll from '../../common/actions/submitPoll'

class PollForm extends Component {
  static propTypes = {
    // from parent:
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    initialValues: PropTypes.object,
    poll: PropTypes.object,
  }

  render() {
    const {fields: {name, description, multiple, options}, ...props} = this.props

    return (
      <Form name={'poll.' + (this.props.poll.id ? 'update' : 'create')} action={submitPoll} {...props}>
        <TextField
          {...name}
          name="title"
        />
        <TextField
          multiline={true}
          {...description}
        />
        {
          options.map((option, index) => (
            <TextField key={index}
              {...option}
              name="option"
            />
          ))
        }
        <SwitchField
          {...multiple}
        />
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const poll = ownProps.current || state.polls.current || {} // either from routing state, or from ajax retrieval
  let initialValues
  if (poll.id) {
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
    initialValues,
    poll,
  }
}

export default reduxForm({
  form: 'poll',
  fields: ['id', 'name', 'description', 'multiple', 'options[]'],
  validate: validator.poll,
  touchOnBlur: false,
}, mapStateToProps)(PollForm)
