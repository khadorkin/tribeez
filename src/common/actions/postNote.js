import api from '../utils/api'

import {
  NEW_NOTE_REQUEST,
  NEW_NOTE_SUCCESS,
  NEW_NOTE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (values) => {
  return (dispatch) => {
    dispatch({
      type: NEW_NOTE_REQUEST,
    })
    api.post('note', values)
      .then((response) => {
        if (response.error) {
          dispatch({
            type: NEW_NOTE_FAILURE,
            error: response.error,
          })
        } else {
          dispatch({
            type: NEW_NOTE_SUCCESS,
            data: response,
          })
          dispatch({
            type: SNACK_MESSAGE,
            message: 'note_created',
          })
        }
      })
      .catch((err) => {
        dispatch({
          type: NEW_NOTE_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
