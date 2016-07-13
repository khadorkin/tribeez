import {db, auth} from '../firebase'

import {
  FIREBASE_FAILURE,
  ITEM,
} from '../constants/actions'

let ref

const on = (itemType, id) => {
  return (dispatch) => {
    ref = db.ref('tribes/' + auth.currentUser.tid + '/' + itemType + 's/' + id)
    ref.on('value', (snapshot) => {
      const item = snapshot.val()
      item.id = snapshot.key
      dispatch({
        type: ITEM,
        itemType,
        item,
      })
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
