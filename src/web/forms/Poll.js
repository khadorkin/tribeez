import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import Checkbox from './fields/Checkbox'

import form from '../../common/forms/poll'
import focus from '../../common/utils/formFocus'
import getItem from '../../common/actions/getItem'
import submitPoll from '../../common/actions/submitPoll'

class PollForm extends Component {
  static propTypes = {
    // from parent component:
    id: PropTypes.string,
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    poll: PropTypes.object,
    tid: PropTypes.string,
    // action creators:
    getItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(props) {
    // when accessing directly to /polls/edit/:id
    if ((!props.poll && props.id) && (!this.props.tid && props.tid)) {
      this.props.getItem('poll', props.id)
    }
  }

  handleSubmit(poll) {
    this.props.handleSubmit(submitPoll)(poll)
      .catch((errors) => focus(errors, this.refs))
  }

  render() {
    const {fields: {name, description, multiple, options}, poll} = this.props

    const subtitle = ((poll && poll.answers) ? <FormattedMessage id="poll_edit_warning" /> : null)

    return (
      <Form subtitle={subtitle} name={'poll.' + (poll ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
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

export default form(PollForm, {getItem})
