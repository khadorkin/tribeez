import router from '../router'
import routes from '../routes'

import {db, auth} from '../firebase'

import {decimal} from '../utils/utils'

const calculateParts = (bill) => {
  // remove empty shares
  bill.parts = bill.parts.filter((part) => part.amount > 0)

  // calculate parts
  const sum = decimal(bill.parts.reduce((prev, curr) => (prev + curr.amount), 0)) // total number of shares, or sum of ammounts

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
    values.parts = calculateParts(values)

    let promise
    let current
    if (values.key) { // existing bill
      promise = db.ref('tribes/' + tid + '/bills/' + values.key).once('value')
      .then((snapshot) => {
        current = snapshot.val()
        return db.ref('tribes/' + tid + '/bills/' + values.key).set(values)
      })
    } else { // new bill
      values.key = db.ref('tribes/' + tid + '/bills').push().key
      promise = db.ref('tribes/' + tid + '/bills/' + values.key).set(values)
    }

    promise
    .then(() => {
      return db.ref('tribes/' + tid + '/members').transaction((members) => {
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
        return members
      })
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type: 'bill',
        action: current ? 'update' : 'new',
        added: Date.now(),
        user: auth.currentUser.uid,
        key: values.key,
        item: values,
      })
    })
    .then(() => {
      resolve()
      router.resetTo(routes.BILLS, dispatch)
    })
    .catch(() => {
      reject({_error: 'request'})
    })
  })
}
