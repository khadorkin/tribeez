import api from '../utils/api'

import {
  DELETE_POLL_REQUEST,
  DELETE_POLL_SUCCESS,
  DELETE_POLL_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

import getMember from './getMember'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_POLL_REQUEST,
    })
    api.delete('poll', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_POLL_FAILURE,
            error: response.error,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'error',
          })
        } else {
          dispatch({
            type: DELETE_POLL_SUCCESS,
            id,
          })
          dispatch(getMember())
          dispatch({
            type: SNACK_MESSAGE,
            message: 'poll_deleted',
          })
        }
      })
      .catch(() => {
        dispatch({
          type: DELETE_POLL_FAILURE,
          error: 'other',
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
  }
}
