import {MOVE_NOTE} from '../constants/actions'

export default (event) => {
  return function(dispatch) {
    dispatch({
      type: MOVE_NOTE,
      ...event,
    })
  }
}
