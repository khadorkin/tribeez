import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const poll = state.item.poll || ownProps.current // first from routing state if any, then from ajax retrieval
  let initialValues
  if (poll) {
    initialValues = {
      id: poll.id,
      name: poll.name,
      description: poll.description,
      multiple: poll.multiple,
      options: poll.options.concat(''), // update poll => add an empty option to be able to add options
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
  return connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'poll',
    validate: validator(['name', 'options'], ['description', 'multiple']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
