import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import report from './error'
import {reminderTimeId} from '../utils/time'

export default (type, id) => {
  return (dispatch) => {
    const tid = auth.currentUser.tid
    dispatch({
      type: REQUEST,
    })
    let updatedMembers
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
          if (members) {
            for (const uid in item.parts) {
              members[uid].balance += item.parts[uid]
            }
            members[item.payer].balance -= item.amount
          }
          return members
        })
        .then((res) => {
          updatedMembers = res.snapshot.val()
        })
      }
      if (type === 'event' && item.reminder !== 'none') {
        return db.ref('reminders/event/' + reminderTimeId(item.start, item.reminder) + '/' + id).remove()
      }
      if (type === 'poll' || type === 'task') {
        return db.ref('reminders/' + type + '/' + id).remove()
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
      if (type === 'bill') {
        return db.ref('reminders/balance/' + tid).transaction((balances) => {
          if (!balances) {
            balances = {}
          }
          for (const uid in updatedMembers) {
            const balance = updatedMembers[uid].balance
            if (balance < -100) { //TODO: use user-defined trigger
              balances[uid] = balance
            } else {
              delete balances[uid]
            }
          }
          return balances
        })
      }
      return null
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'deleteItem/' + type))
      dispatch({
        type: SNACK_MESSAGE,
        message: 'error',
      })
    })
  }
}
