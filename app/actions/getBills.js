import api from '../utils/api'

import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_BILLS_REQUEST,
    })
    api.get('bills', {start: 0, limit: 10}) //TODO: paging
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_BILLS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_BILLS_SUCCESS,
            list: response,
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
