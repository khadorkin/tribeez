import api from '../utils/api'

import {
  GET_POLL_REQUEST,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: GET_POLL_REQUEST,
    })
    api.get('poll', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_POLL_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_POLL_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_POLL_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
