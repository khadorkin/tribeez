import { UPDATE_JOIN_DATA } from '../constants/actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_JOIN_DATA,
      data,
    })
  }
}
