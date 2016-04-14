import api from '../utils/api'

import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
} from '../constants/actions'

export default (page) => {
  return function(dispatch) {
    dispatch({
      type: GET_BILLS_REQUEST,
    })
    api.get('bills', {page})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_BILLS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_BILLS_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_BILLS_FAILURE,
          error: err.message,
        })
      })
  }
}
