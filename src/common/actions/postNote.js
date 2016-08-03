import {db, auth} from '../firebase'

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

    values.updated = Date.now()
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
