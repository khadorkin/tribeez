import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  GET_POLL_SUCCESS,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + auth.currentUser.tid + '/polls/' + id).once('value')
    .then((snapshot) => {
      dispatch({
        type: GET_POLL_SUCCESS,
        data: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getPoll',
        error,
      })
    })
  }
}
