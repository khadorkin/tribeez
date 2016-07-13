import {db, auth, timestamp} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default (id) => {
  return (dispatch) => {
    const tid = auth.currentUser.tid
    dispatch({
      type: FIREBASE_REQUEST,
    })
    let item
    const ref = db.ref('tribes/' + tid + '/bills/' + id)
    ref.once('value')
    .then((snapshot) => {
      item = snapshot.val()
      if (!item) {
        throw 'not_found'
      }
      ref.remove()
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/members').transaction((members) => {
        for (const uid in item.parts) {
          members[uid].balance += item.parts[uid]
        }
        members[item.payer].balance -= item.amount
        return members
      })
    })
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type: 'bill',
        action: 'delete',
        added: timestamp,
        user: auth.currentUser.uid,
        item,
        id,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'deleteBill',
        error,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'error',
      })
    })
  }
}
