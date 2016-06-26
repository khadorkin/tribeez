import api from '../utils/api'

import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_TASKS_REQUEST,
    })
    api.get('tasks')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_TASKS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_TASKS_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_TASKS_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
