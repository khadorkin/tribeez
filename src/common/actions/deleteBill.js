import api from '../utils/api'

import {
  DELETE_BILL_REQUEST,
  DELETE_BILL_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

import getMember from './getMember'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_BILL_REQUEST,
    })
    api.delete('bill', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_BILL_FAILURE,
            error: response.error,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'error',
          })
        } else {
          dispatch(getMember()) // update balance
        }
      })
      .catch(() => {
        dispatch({
          type: DELETE_BILL_FAILURE,
          error: 'other',
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
  }
}
