import api from '../utils/api'

import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
} from '../constants/actions'

export default (type, id, content) => {
  return function(dispatch) {
    dispatch({
      type: COMMENT_REQUEST,
    })
    api.post('comment', {type, id, content})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: COMMENT_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: COMMENT_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: COMMENT_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
