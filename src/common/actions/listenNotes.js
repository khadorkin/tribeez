import {db, auth} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  NOTES,
} from '../constants/actions'

import report from './error'

let ref

const on = () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    let gotOnce = false

    ref = db.ref('tribes/' + auth.currentUser.tid + '/notes')
    ref.on('value', (snapshot) => {
      dispatch({
        type: NOTES,
        notes: snapshot.val(),
      })
      if (!gotOnce) {
        dispatch({
          type: SUCCESS,
        })
        gotOnce = true
      }
    }, (error) => {
      dispatch(report(error, 'listenNotes'))
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
      type: NOTES,
      notes: {},
    })
  }
}

export default {on, off}
