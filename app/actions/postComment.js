import api from '../api'

import { COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE } from '../constants/actions'

export default (id, content) => {
  return function(dispatch) {
    dispatch({
      type: COMMENT_REQUEST,
    })
    api.post('comment', { id, content })
      .then((res) => {
        if (res.error) {
          dispatch({
            type: COMMENT_FAILURE,
            error: res.error,
          })
        } else {
          dispatch({
            type: COMMENT_SUCCESS,
            entry_id: id,
            data: res,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: COMMENT_FAILURE,
          error: 'other',
        })
      })
  }
}
