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
      description: task.description || '',
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
    tid: state.tribe.id,
    users: state.tribe.users,
    userMap: state.tribe.userMap,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'task',
    fields: ['id', 'name', 'description', 'wait', 'users[].uid', 'users[].checked', 'added', 'author'],
    validate: validator(['name', 'wait', 'users'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
