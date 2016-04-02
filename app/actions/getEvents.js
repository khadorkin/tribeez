import api from '../utils/api'

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_EVENTS_REQUEST,
    })
    api.get('events')
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_EVENTS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_EVENTS_SUCCESS,
            list: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_EVENTS_FAILURE,
          error: err.message,
        })
      })
  }
}
