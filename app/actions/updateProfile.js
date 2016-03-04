import {UPDATE_PROFILE_DATA} from '../constants/actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_PROFILE_DATA,
      data,
    })
  }
}
