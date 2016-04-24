import api from '../utils/api'

import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: GET_TASK_REQUEST,
    })
    api.get('task', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_TASK_FAILURE,
          })
        } else {
          dispatch({
            type: GET_TASK_SUCCESS,
            data: response,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_TASK_FAILURE,
        })
      })
  }
}
