import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const task = ownProps.current || state.tasks.current // either from routing state, or from ajax retrieval
  let initialValues
  if (task) {
    initialValues = {
      id: task.id,
      name: task.name,
      description: task.description || '',
      wait: task.wait,
      notice: task.notice,
      users: state.member.tribe.users.map((user) => ({user_id: user.id, checked: (task.counters[user.id] !== undefined)})),
    }
  } else {
    initialValues = {
      users: state.member.tribe.users.map((user) => ({user_id: user.id, checked: true})),
    }
  }
  return {
    task,
    initialValues,
    users: state.member.tribe.users,
    userMap: state.member.tribe.userMap,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'task',
    fields: ['id', 'name', 'description', 'wait', 'notice', 'users[].user_id', 'users[].checked'],
    validate: validator(['name', 'wait', 'notice', 'users'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
