import api from '../utils/api'

import {
  GET_LOG_REQUEST,
  GET_LOG_SUCCESS,
  GET_LOG_FAILURE,
} from '../constants/actions'

export default (type, id) => {
  return (dispatch) => {
    dispatch({
      type: GET_LOG_REQUEST,
    })
    api.get('log', {type, id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_LOG_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_LOG_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_LOG_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
