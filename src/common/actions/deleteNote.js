import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import {firebaseError} from './error'

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
      dispatch(firebaseError(error, 'deleteNote'))
    })
  }
}
