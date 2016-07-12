import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  GET_TASK_SUCCESS,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + auth.currentUser.tid + '/tasks/' + id).once('value')
    .then((snapshot) => {
      dispatch({
        type: GET_TASK_SUCCESS,
        data: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getTask',
        error,
      })
    })
  }
}
