import api from '../api'

import {COMMENT_REQUEST, COMMENT_SUCCESS, COMMENT_FAILURE} from '../constants/actions'

export default (id, content) => {
  return function(dispatch) {
    dispatch({
      type: COMMENT_REQUEST,
    })
    api.post('comment', {id, content})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: COMMENT_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: COMMENT_SUCCESS,
            entry_id: id,
            data: response,
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
