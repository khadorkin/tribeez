import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const mapStateToProps = (state, ownProps) => {
  const event = ownProps.current || state.events.current // either from routing state, or from ajax retrieval
  let initialValues
  if (event) {
    initialValues = {
      id: event.id,
      name: event.name,
      description: event.description || '',
      start: event.start,
      end: event.end,
      location: event.location || '',
      url: event.url || '',
      host: event.host,
    }
  } else {
    initialValues = {
      host: state.user.uid,
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
    fields: ['id', 'name', 'description', 'start', 'end', 'location', 'url', 'host'],
    validate: validator(['name', 'start'], ['end', 'description', 'location', 'url']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
