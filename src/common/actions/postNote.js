import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

export default (values) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes').push(values)
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'postNote',
        error: error.code,
      })
    })
  }
}
