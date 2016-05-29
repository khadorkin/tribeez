import {push} from 'react-router-redux'
import routes from '../routes'

export default (event) => {
  const start = event.start.getTime()
  const end = event.end.getTime()
  const state = end > start ? {start, end} : {start: end, end: start}
  return function(dispatch) {
    dispatch(push({
      pathname: routes.EVENTS_NEW, //TODO: mobile
      state,
    }))
  }
}