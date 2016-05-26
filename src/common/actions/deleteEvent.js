import api from '../utils/api'

import {
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
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
      .catch(() => {
        dispatch({
          type: DELETE_EVENT_FAILURE,
          error: 'other',
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
  }
}
