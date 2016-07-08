import api from '../utils/api'

import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_EVENT_REQUEST,
    })
    api.get('event', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_EVENT_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_EVENT_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_EVENT_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
