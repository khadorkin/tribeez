import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  GET_BILL_SUCCESS,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + auth.currentUser.tid + '/bills/' + id).once('value')
    .then((snapshot) => {
      dispatch({
        type: GET_BILL_SUCCESS,
        data: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getBill',
        error,
      })
    })
  }
}
