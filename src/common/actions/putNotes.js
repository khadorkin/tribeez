import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

export default (ids) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    const updates = {}
    ids.forEach((id, index) => {
      updates[id + '/position'] = index
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes').update(updates)
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'putNotes',
        error: error.code,
      })
    })
  }
}
