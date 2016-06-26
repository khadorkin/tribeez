import api from '../utils/api'

import {
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: GET_BILL_REQUEST,
    })
    api.get('bill', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_BILL_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_BILL_SUCCESS,
            data: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_BILL_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
