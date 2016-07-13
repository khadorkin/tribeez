import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  GET_NOTES_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

let ref

const on = () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    ref = db.ref('tribes/' + auth.currentUser.tid + '/notes')
    ref.on('value', (snapshot) => {
      dispatch({
        type: GET_NOTES_SUCCESS,
        notes: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    }, (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getNotes',
        error: error.code,
      })
    })
  }
}

const off = () => {
  return (dispatch) => {
    if (ref) {
      ref.off()
      ref = null
    }
    dispatch({
      type: GET_NOTES_SUCCESS,
      notes: {},
    })
  }
}

export default {on, off}
