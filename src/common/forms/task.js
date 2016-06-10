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
    }
  }
  return {
    lang: state.app.lang,
    task,
    initialValues,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'task',
    fields: ['id', 'name', 'description', 'wait', 'notice'],
    validate: validator(['name', 'wait', 'notice'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
