import {UPDATE_INVITE_DATA} from '../constants/actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_INVITE_DATA,
      data,
    })
  }
}
