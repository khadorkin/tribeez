import api from '../utils/api'

import {
  POST_DONE_REQUEST,
  POST_DONE_SUCCESS,
  POST_DONE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id, uid) => {
  return (dispatch) => {
    dispatch({
      type: POST_DONE_REQUEST,
    })
    api.post('done', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: POST_DONE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: POST_DONE_SUCCESS,
            id,
            uid,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'task_done',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_DONE_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
