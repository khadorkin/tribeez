import api from '../utils/api'

import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_EVENTS_REQUEST,
    })
    api.get('events', {page})
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
            page,
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
