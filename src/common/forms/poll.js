import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

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
    initialValues,
    poll,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'poll',
    fields: ['id', 'name', 'description', 'multiple', 'options[]'],
    validate: validator(['name', 'options'], ['description', 'multiple']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
