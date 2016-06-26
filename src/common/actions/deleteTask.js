import api from '../utils/api'

import {
  DELETE_TASK_REQUEST,
  DELETE_TASK_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_TASK_REQUEST,
    })
    api.delete('task', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_TASK_FAILURE,
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
          type: DELETE_TASK_FAILURE,
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
