import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  GET_EVENT_SUCCESS,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + auth.currentUser.tid + '/events/' + id).once('value')
    .then((snapshot) => {
      dispatch({
        type: GET_EVENT_SUCCESS,
        data: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getEvent',
        error,
      })
    })
  }
}
