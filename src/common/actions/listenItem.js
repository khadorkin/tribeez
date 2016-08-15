import {db, auth} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  ITEM,
  ITEM_CLEAR,
} from '../constants/actions'

import report from './error'

let ref

const on = (itemType, id) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    let gotOnce = false

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
      if (!gotOnce) {
        dispatch({
          type: SUCCESS,
        })
        gotOnce = true
      }
    }, (error) => {
      dispatch(report(error, 'listenItem/' + itemType))
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
