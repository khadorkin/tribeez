import {db} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  MEMBER_UPDATED,
} from '../constants/actions'

import {firebaseError} from './error'

export default (uid) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('users/' + uid).once('value')
    .then((snapshot) => {
      dispatch({
        type: MEMBER_UPDATED,
        user: snapshot.val(),
        uid,
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'getUser'))
    })
  }
}
