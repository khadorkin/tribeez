import api from '../utils/api'

import {
  GET_POLLS_REQUEST,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_POLLS_REQUEST,
    })
    api.get('polls', {page})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_POLLS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_POLLS_SUCCESS,
            data: response,
            page,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_POLLS_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
