import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field, FieldArray} from 'redux-form'
import TextField from './fields/Text'
import Options from './fields/Options'
import SwitchField from './fields/Switch'
import InfoBox from '../components/InfoBox'

import form from '../../common/forms/poll'
import submitPoll from '../../common/actions/submitPoll'

class PollForm extends Component {
  static propTypes = {
    // from redux:
    poll: PropTypes.object,
  }

  render() {
    const {poll, ...props} = this.props

    const subtitle = poll && poll.answers && <InfoBox type="alert" id="poll_edit_warning" />

    return (
      <ScrollView>
        <Form name={'poll.' + (poll ? 'update' : 'create')} action={submitPoll} {...props}>
          {subtitle}
          <Field
            name="name"
            component={TextField}
            labelId="title"
          />
          <Field
            name="description"
            component={TextField}
            multiline={true}
          />
          <FieldArray
            name="options"
            component={Options}
          />
          <Field
            name="multiple"
            component={SwitchField}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(PollForm)
