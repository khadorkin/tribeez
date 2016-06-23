import api from '../utils/api'

import {
  GET_HISTORY_REQUEST,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_HISTORY_REQUEST,
    })
    api.get('history', {page})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_HISTORY_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_HISTORY_SUCCESS,
            data: response,
            page,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_HISTORY_FAILURE,
          error: err.message,
        })
      })
  }
}
