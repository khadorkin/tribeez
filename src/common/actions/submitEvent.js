import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import saveLog from './saveLog'
import report from './error'
import {reminderTimeId, storedTime} from '../utils/time'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const tid = auth.currentUser.tid
    let id = values.id
    delete values.id
    let action
    let current
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      values.added = timestamp
      id = db.ref('tribes/' + tid + '/events').push().key
    }

    // the index is used to split between past and upcoming events:
    if (values.end) {
      values.index = values.end
    } else {
      const start = new Date(values.start)
      if (start.getHours() === 0 && start.getMinutes() === 0) {
        values.index = values.start + 86400 * 1000 // default duration = 1 day
      } else {
        values.index = values.start + 3600 * 1000 // default duration = 1 hour
      }
    }

    // store day events as Y-m-d strings instead of timestamps, to avoid timezone issues:
    values.start = storedTime(values.start)
    values.end = storedTime(values.end)

    db.ref('tribes/' + tid + '/events/' + id).transaction((event) => {
      current = event // null if new bill
      return {...event, ...values} // to keep the log
    })
    .then(() => {
      values.id = id
      return saveLog('event', action, values)
    })
    .then(() => {
      if (current && current.reminder !== 'none') {
        return db.ref('reminders/event/' + reminderTimeId(current.start, current.reminder) + '/' + id).remove()
      }
      return null
    })
    .then(() => {
      if (values.reminder !== 'none') {
        return db.ref('reminders/event/' + reminderTimeId(values.start, values.reminder) + '/' + id).set(tid)
      }
      return null
    })
    .then(() => {
      resolve()
      router.resetTo(routes.EVENTS, dispatch)
    })
    .catch((error) => {
      dispatch(report(error, 'submitEvent'))
      reject({_error: 'request'})
    })
  })
}
