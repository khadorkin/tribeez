import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  ITEM,
} from '../constants/actions'

let ref
let initial

const on = (itemType, id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    initial = true
    ref = db.ref('tribes/' + auth.currentUser.tid + '/' + itemType + 's/' + id)
    ref.on('value', (snapshot) => {
      const item = snapshot.val()
      if (item) {
        item.id = snapshot.key
        dispatch({
          type: ITEM,
          itemType,
          item,
        })
      } else {
        dispatch({
          type: ITEM,
          itemType,
          error: 'not_found',
        })
      }
      if (initial) {
        dispatch({
          type: FIREBASE_SUCCESS,
        })
        initial = false
      }
    }, (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getItem/' + itemType,
        error,
      })
    })
  }
}

const off = (itemType/*, id*/) => {
  return (dispatch) => {
    if (ref) {
      dispatch({
        type: ITEM,
        itemType,
        item: null,
      })
      ref.off('value')
      ref = null
    }
  }
}

export default {on, off}
