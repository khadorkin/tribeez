import api from '../utils/api'

import {
  GET_POLLS_REQUEST,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    dispatch({
      type: GET_POLLS_REQUEST,
    })
    api.get('polls', {start: 0, limit: 10}) //TODO: paging
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_POLLS_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: GET_POLLS_SUCCESS,
            list: response,
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_POLLS_FAILURE,
          error: err.message,
        })
      })
  }
}
