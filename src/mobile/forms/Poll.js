import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SwitchField from './fields/Switch'

import form from '../../common/forms/poll'
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
      <Form name={'poll.' + (this.props.poll ? 'update' : 'create')} action={submitPoll} {...props}>
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

export default form(PollForm)
