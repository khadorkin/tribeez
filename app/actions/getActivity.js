import api from '../utils/api'

import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
} from '../constants/actions'

export default (page = 0) => {
  return function(dispatch) {
    dispatch({
      type: GET_ACTIVITY_REQUEST,
    })
    api.get('activity', {page})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_ACTIVITY_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_ACTIVITY_SUCCESS,
            data: response,
            page,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ACTIVITY_FAILURE,
          error: err.message,
        })
      })
  }
}
