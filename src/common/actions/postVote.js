import api from '../utils/api'

import {
  POST_VOTE_REQUEST,
  POST_VOTE_SUCCESS,
  POST_VOTE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id, choices, uid) => {
  return function(dispatch) {
    dispatch({
      type: POST_VOTE_REQUEST,
    })
    api.post('vote', {id, choices})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: POST_VOTE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: POST_VOTE_SUCCESS,
            id,
            choices,
            uid,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'voted',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: POST_VOTE_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
