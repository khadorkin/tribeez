import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  PUT_NOTE_SUCCESS,
} from '../constants/actions'

export default (data) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes/' + data.id).set({
      title: data.title,
      content: data.content,
      position: data.position,
    })
    .then(() => {
      dispatch({
        type: PUT_NOTE_SUCCESS,
        data,
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'putNotes',
        error: error.code,
      })
    })
  }
}
