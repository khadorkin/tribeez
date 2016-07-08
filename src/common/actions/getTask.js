import api from '../utils/api'

import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_TASK_REQUEST,
    })
    api.get('task', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_TASK_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_TASK_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_TASK_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
