import api from '../api'

import { GET_INVITES_REQUEST, GET_INVITES_SUCCESS, GET_INVITES_FAILURE } from '../actions'

export default (start = 0, limit = 10) => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITES_REQUEST,
    })

    api.get('invites', { start, limit })
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_INVITES_FAILURE,
            error: data.error,
          })
        } else {
          dispatch({
            type: GET_INVITES_SUCCESS,
            list: data,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_INVITES_FAILURE,
        })
      })

  }
}
