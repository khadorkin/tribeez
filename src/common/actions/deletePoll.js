import api from '../utils/api'

import {
  DELETE_POLL_REQUEST,
  DELETE_POLL_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_POLL_REQUEST,
    })
    api.delete('poll', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_POLL_FAILURE,
            error: response.error,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'error',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: DELETE_POLL_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
  }
}
