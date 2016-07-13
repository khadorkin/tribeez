import {db} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  MEMBER_UPDATED,
} from '../constants/actions'

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
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getUser',
        error: error.code,
      })
    })
  }
}
