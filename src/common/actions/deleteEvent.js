import api from '../utils/api'

import {
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_EVENT_REQUEST,
    })
    api.delete('event', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_EVENT_FAILURE,
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
          type: DELETE_EVENT_FAILURE,
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
