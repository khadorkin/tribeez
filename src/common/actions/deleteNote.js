import api from '../utils/api'

import {
  DELETE_NOTE_REQUEST,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: DELETE_NOTE_REQUEST,
    })
    api.delete('note', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: DELETE_NOTE_FAILURE,
            error: response.error,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'error',
          })
        } else {
          dispatch({
            type: DELETE_NOTE_SUCCESS,
            id,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'note_deleted',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: DELETE_NOTE_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
        dispatch({
          type: SNACK_MESSAGE,
          message: 'error',
        })
      })
  }
}
