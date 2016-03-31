import api from '../utils/api'

import {
  PUT_NOTE_REQUEST,
  PUT_NOTE_SUCCESS,
  PUT_NOTE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: PUT_NOTE_REQUEST,
    })
    api.put('note', data)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: PUT_NOTE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: PUT_NOTE_SUCCESS,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'note_updated',
          })
        }
      })
      .catch(() => {
        dispatch({
          type: PUT_NOTE_FAILURE,
          error: 'other',
        })
      })
  }
}
