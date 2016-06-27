import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import Checkbox from './fields/Checkbox'

import form from '../../common/forms/poll'
import focus from '../../common/utils/formFocus'
import getPoll from '../../common/actions/getPoll'
import submitPoll from '../../common/actions/submitPoll'

class PollForm extends Component {
  static propTypes = {
    // from parent component:
    id: PropTypes.number,
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    // from redux:
    initialValues: PropTypes.object,
    poll: PropTypes.object,
    // action creators:
    getPoll: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    // when accessing directly to /poll/:id
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

export default form(PollForm, {getPoll})
