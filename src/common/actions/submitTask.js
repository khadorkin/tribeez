import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import saveLog from './saveLog'
import {firebaseError} from './error'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    values.counters = {}
    values.users.forEach((user) => {
      if (user.checked) {
        values.counters[user.uid] = 0
      }
    })
    delete values.users

    const tid = auth.currentUser.tid
    let id = values.id
    delete values.id
    let action
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      values.added = timestamp
      id = db.ref('tribes/' + tid + '/tasks').push().key
    }

    db.ref('tribes/' + tid + '/tasks/' + id).transaction((task) => {
      // keep existing counters for selected participants:
      if (task) {
        for (const key in values.counters) {
          if (task.counters[key]) {
            values.counters[key] = task.counters[key]
          }
        }
      }
      return {...task, ...values} // to keep the log
    })
    .then(() => {
      values.id = id
      return saveLog('task', action, values)
    })
    .then(() => {
      if (action === 'new') {
        return db.ref('notifications/task/' + id).set(tid)
      }
      return true // nothing to update in the notification
    })
    .then(() => {
      resolve()
      router.resetTo(routes.TASKS, dispatch)
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'submitTask'))
      reject({_error: 'request'})
    })
  })
}
