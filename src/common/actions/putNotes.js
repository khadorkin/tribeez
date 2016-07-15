import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

export default () => {
  return (dispatch, getState) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    const updates = {}
    getState().notes.items.forEach((note, index) => {
      updates[note.id + '/position'] = index
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
