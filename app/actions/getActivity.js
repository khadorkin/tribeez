import api from '../api'

import { GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE } from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_ACTIVITY_REQUEST,
    })

    api.get('activity', { start: 0, limit: 10 }) //TODO: paging
      .then((data) => {
        if (data.error) {
          dispatch({
            type: GET_ACTIVITY_FAILURE,
            error: data.error,
          })
        } else {
          dispatch({
            type: GET_ACTIVITY_SUCCESS,
            entries: data,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ACTIVITY_FAILURE,
          error: err.message,
        })
      })
  }
}
