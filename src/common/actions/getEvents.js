import api from '../utils/api'

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from '../constants/actions'

export default (upcoming) => {
  return function(dispatch) {
    dispatch({
      type: GET_EVENTS_REQUEST,
    })
    api.get('events', {upcoming})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_EVENTS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_EVENTS_SUCCESS,
            data: response,
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
