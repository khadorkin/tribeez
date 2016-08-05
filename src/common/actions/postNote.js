import {db, auth, timestamp} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
} from '../constants/actions'

import {firebaseError} from './error'

export default (values) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    values.updated = timestamp
    values.author = auth.currentUser.uid

    db.ref('tribes/' + auth.currentUser.tid + '/notes').push(values)
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'postNote'))
    })
  }
}
