import api from '../utils/api'

import {
  GET_UPCOMING_EVENTS_REQUEST,
  GET_UPCOMING_EVENTS_SUCCESS,
  GET_UPCOMING_EVENTS_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_UPCOMING_EVENTS_REQUEST,
    })
    api.get('events', {page, filter: 'upcoming'})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_UPCOMING_EVENTS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_UPCOMING_EVENTS_SUCCESS,
            data: response,
            page,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_UPCOMING_EVENTS_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
