import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  ITEM,
  ITEM_CLEAR,
} from '../constants/actions'

import {firebaseError} from './error'

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
      dispatch(firebaseError(error, 'listenItem/' + itemType))
    })
  }
}

const off = () => {
  return (dispatch) => {
    if (ref) {
      dispatch({
        type: ITEM_CLEAR,
      })
      ref.off('value')
      ref = null
    }
  }
}

export default {on, off}
