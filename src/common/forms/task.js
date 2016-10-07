import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const task = state.item.task || ownProps.current // first from routing state if any, then from ajax retrieval
  let initialValues
  if (task) {
    initialValues = {
      id: task.id,
      name: task.name,
      description: task.description,
      wait: task.wait,
      users: state.tribe.users.map((user) => ({uid: user.uid, checked: (task.counters[user.uid] !== undefined)})),
      added: task.added,
      author: task.author,
    }
  } else {
    initialValues = {
      users: state.tribe.users.map((user) => ({uid: user.uid, checked: true})),
      author: state.user.uid,
    }
  }
  return {
    initialValues,
    task,
    tid: state.tribe.id, // Web
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'task',
    validate: validator(['name', 'wait', 'users'], ['description']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
