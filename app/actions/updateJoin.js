import { UPDATE_JOIN_DATA } from '../actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_JOIN_DATA,
      data,
    })
  }
}
