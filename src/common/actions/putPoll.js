import api from '../utils/api'

import {
  PUT_POLL_REQUEST,
  PUT_POLL_SUCCESS,
  PUT_POLL_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: PUT_POLL_REQUEST,
    })
    api.put('poll', data)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: PUT_POLL_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: PUT_POLL_SUCCESS,
            data,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'poll_updated',
          })
        }
      })
      .catch(() => {
        dispatch({
          type: PUT_POLL_FAILURE,
          error: 'other',
        })
      })
  }
}
