import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes/' + id).remove()
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'note_deleted',
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'deleteNote',
        error: error.code,
      })
    })
  }
}
