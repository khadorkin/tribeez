import api from '../utils/api'

import {
  //PUT_NOTE_REQUEST,
  PUT_NOTE_FAILURE,
  //SNACK_MESSAGE,
} from '../constants/actions'

export default (ids) => {
  return function(dispatch) {
    /*dispatch({
      type: PUT_NOTE_REQUEST,
    })*/
    api.put('notes', {ids})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: PUT_NOTE_FAILURE,
            error: response.error,
          })
        }/* else {
          dispatch({
            type: SNACK_MESSAGE,
            message: 'notes_reordered',
          })
        }*/
      })
      .catch((err) => {
        dispatch({
          type: PUT_NOTE_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
      })
  }
}
