import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const task = ownProps.current || state.item.task // either from routing state, or from ajax retrieval
  let initialValues
  if (task) {
    initialValues = {
      id: task.id,
      name: task.name,
      description: task.description || '',
      wait: task.wait,
      notice: task.notice,
      users: state.tribe.users.map((user) => ({user_id: user.uid, checked: (task.counters[user.uid] !== undefined)})),
      added: task.added,
      author: task.author,
    }
  } else {
    initialValues = {
      users: state.tribe.users.map((user) => ({user_id: user.uid, checked: true})),
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
    fields: ['id', 'name', 'description', 'wait', 'notice', 'users[].user_id', 'users[].checked', 'added', 'author'],
    validate: validator(['name', 'wait', 'notice', 'users'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
