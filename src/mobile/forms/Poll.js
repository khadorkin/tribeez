import React, {Component, PropTypes} from 'react'
import {StyleSheet} from 'react-native'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import TextField from './fields/Text'
import SwitchField from './fields/Switch'
import FormattedMessage from '../components/FormattedMessage'

import form from '../../common/forms/poll'
import colors from '../../common/constants/colors'
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
    const {fields: {name, description, multiple, options}, poll, ...props} = this.props

    const subtitle = poll && poll.answers && <FormattedMessage id="poll_edit_warning" style={styles.warning} />

    return (
      <ScrollView>
        <Form name={'poll.' + (poll ? 'update' : 'create')} action={submitPoll} {...props}>
          {subtitle}
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  warning: {
    margin: 8,
    marginBottom: 24,
    color: colors.warning,
  },
})

export default form(PollForm)
