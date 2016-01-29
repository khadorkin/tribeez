import api from '../api'

import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from '../actions'

export default (token) => {
  return function(dispatch) {
    dispatch({
      type: USER_REQUEST,
    })
    api.get('user', {
      token,
    })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: USER_FAILURE,
          })
        } else {
          dispatch({
            type: USER_SUCCESS,
            data,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: USER_FAILURE,
        })
      })
  }
}
