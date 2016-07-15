import {db, auth, timestamp} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (type, id) => {
  return (dispatch) => {
    const tid = auth.currentUser.tid
    dispatch({
      type: FIREBASE_REQUEST,
    })
    let item
    const ref = db.ref('tribes/' + tid + '/' + type + 's/' + id)
    ref.once('value')
    .then((snapshot) => {
      item = snapshot.val()
      if (!item) {
        throw 'not_found'
      }
      return ref.remove()
    })
    .then(() => {
      if (type === 'bill') {
        return db.ref('tribes/' + tid + '/members').transaction((members) => {
          for (const uid in item.parts) {
            members[uid].balance += item.parts[uid]
          }
          members[item.payer].balance -= item.amount
          return members
        })
      }
      return null
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type,
        action: 'delete',
        time: timestamp,
        author: auth.currentUser.uid,
        item,
        id,
      })
    })
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'deleteItem/' + type,
        error,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'error',
      })
    })
  }
}
