import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'
import {getTimestamp} from '../utils/time'

const mapStateToProps = (state, ownProps) => {
  const event = state.item.event || ownProps.current // first from routing state if any, then from ajax retrieval
  let initialValues
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      description: event.description || '',
      start: getTimestamp(event.start),
      end: getTimestamp(event.end),
      location: event.location || '',
      url: event.url || '',
      reminder: event.reminder || 'none',
      added: event.added,
      author: event.author || state.user.uid,
    }
  } else {
    initialValues = {
      author: state.user.uid,
      reminder: '1d',
    }
  }
  return {
    initialValues,
    event,
    tid: state.tribe.id,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'event',
    fields: ['id', 'name', 'description', 'start', 'end', 'location', 'url', 'reminder', 'added', 'author'],
    validate: validator(['name', 'start'], ['end', 'description', 'location', 'url', 'reminder']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
