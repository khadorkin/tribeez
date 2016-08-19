import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'
import {decimal} from '../utils/number'

import saveLog from './saveLog'
import report from './error'

const calculateParts = (bill) => {
  // total number of shares, or sum of ammounts
  const sum = decimal(bill.parts.reduce((prev, curr) => (prev + curr.amount), 0))

  // calculate parts ("shares")
  const parts = {}
  if (bill.method === 'shares') {
    const share_amount = bill.amount / sum // no rounding yet, to keep sharing precision
    let distributed = 0
    const num_parts = bill.parts.length
    bill.parts.forEach((part, index) => {
      if (index < num_parts - 1) {
        parts[part.uid] = decimal(part.amount * share_amount)
        distributed += parts[part.uid]
      } else {
        // last part gets the rest of the cake (to prevent from missing cents after rounding)
        parts[part.uid] = decimal(bill.amount - distributed)
      }
    })
  } else {
    bill.parts.forEach((part) => {
      parts[part.uid] = part.amount
    })
  }
  return parts
}

export default (values, dispatch) => {
  const tid = auth.currentUser.tid
  return new Promise((resolve, reject) => {
    // remove empty shares
    values.parts = values.parts.filter((part) => part.amount > 0)

    // store the original shares in order to find them again when editing:
    if (values.method === 'shares') {
      values.shares = {}
      values.parts.forEach((part) => {
        values.shares[part.uid] = part.amount
      })
    }

    // get parts object from form array:
    values.parts = calculateParts(values)

    let id = values.id
    delete values.id
    let action
    let current
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      values.added = timestamp
      id = db.ref('tribes/' + tid + '/bills').push().key
    }
    let updatedMembers

    db.ref('tribes/' + tid + '/bills/' + id).transaction((bill) => {
      current = bill // stays null if new
      return {...bill, ...values} // to keep the log
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/members').transaction((members) => {
        if (members) {
          if (current) {
            // remove old offsets
            for (const uid in current.parts) {
              members[uid].balance += current.parts[uid]
            }
            members[current.payer].balance -= current.amount
          }
          // add new offsets
          for (const uid in values.parts) {
            members[uid].balance -= values.parts[uid]
          }
          members[values.payer].balance += values.amount
        }
        return members
      })
    })
    .then((res) => {
      updatedMembers = res.snapshot.val()
      values.id = id
      return saveLog('bill', action, values)
    })
    .then(() => {
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
    })
    .then(() => {
      resolve()
      router.resetTo(routes.BILLS, dispatch)
    })
    .catch((error) => {
      dispatch(report(error, 'submitBill'))
      reject({_error: 'request'})
    })
  })
}
