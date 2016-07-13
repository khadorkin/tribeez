import {MOVE_NOTE} from '../constants/actions'

export default (event) => {
  return (dispatch) => {
    dispatch({
      type: MOVE_NOTE,
      ...event,
    })
  }
}
