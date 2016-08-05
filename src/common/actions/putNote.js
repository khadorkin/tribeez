import {db, auth, timestamp} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  PUT_NOTE_SUCCESS,
} from '../constants/actions'

import {firebaseError} from './error'

export default (data) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes/' + data.id).set({
      title: data.title,
      content: data.content,
      position: data.position,
      updated: timestamp,
      author: auth.currentUser.uid,
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
      dispatch(firebaseError(error, 'putNote'))
    })
  }
}
