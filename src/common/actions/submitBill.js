import {SubmissionError} from 'redux-form'

import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'
import {decimal} from '../utils/number'

import saveLog from './saveLog'
import failure from './failure'

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
  return new Promise((resolve, reject) => {
    const bill = {
      name: values.name,
      description: values.description,
      payer: values.payer,
      paid: values.paid,
      amount: Number(values.amount),
      method: values.method,
      parts: values.parts
        .map((part) => ({uid: part.uid, amount: Number(part.amount)}))
        .filter((part) => part.amount > 0), // remove empty shares
      added: values.added || timestamp,
      author: values.author,
    }

    // store the original shares in order to find them again when editing:
    if (bill.method === 'shares') {
      bill.shares = {}
      bill.parts.forEach((part) => {
        bill.shares[part.uid] = part.amount
      })
    }

    // get parts object from form array:
    bill.parts = calculateParts(bill)

    const tid = auth.currentUser.tid
    let id = values.id
    let action
    let current
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      id = db.ref('tribes/' + tid + '/bills').push().key
    }
    let updatedMembers

    db.ref('tribes/' + tid + '/bills/' + id).transaction((currentBill) => {
      if (currentBill) {
        current = currentBill // stays undefined if new
        bill.log = currentBill.log
      }
      return bill
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
          for (const uid in bill.parts) {
            members[uid].balance -= bill.parts[uid]
          }
          members[bill.payer].balance += bill.amount
        }
        return members
      })
    })
    .then((res) => {
      updatedMembers = res.snapshot.val()
      bill.id = id
      return saveLog('bill', action, bill)
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
      dispatch(failure(error, 'submitBill'))
      reject(new SubmissionError({_error: 'request'}))
    })
  })
}
