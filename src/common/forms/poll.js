import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const poll = state.item.poll || ownProps.current // first from routing state if any, then from ajax retrieval
  let initialValues
  if (poll) {
    poll.options.push('') // update poll => add an empty option to be able to add options
    initialValues = {
      id: poll.id,
      name: poll.name,
      description: poll.description || '',
      multiple: Boolean(poll.multiple),
      options: poll.options,
      added: poll.added,
      author: poll.author,
    }
  } else {
    initialValues = {
      multiple: false,
      options: ['', ''], // new poll => two empty options
      author: state.user.uid,
    }
  }
  return {
    initialValues,
    poll,
    tid: state.tribe.id,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'poll',
    fields: ['id', 'name', 'description', 'multiple', 'options[]', 'added', 'author'],
    validate: validator(['name', 'options'], ['description', 'multiple']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
