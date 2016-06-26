import api from '../utils/api'

import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_ACTIVITY_REQUEST,
    })
    api.get('activity')
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
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ACTIVITY_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
