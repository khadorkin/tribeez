import api from '../api'

import { GET_INVITES_REQUEST, GET_INVITES_SUCCESS, GET_INVITES_FAILURE } from '../actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_INVITES_REQUEST,
    })

    api.get('invites', { start: 0, limit: 10 }) //TODO: paging
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
      .catch((err) => {
        dispatch({
          type: GET_INVITES_FAILURE,
          error: err.message,
        })
      })

  }
}
