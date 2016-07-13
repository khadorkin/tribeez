import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import {FIREBASE_FAILURE} from '../constants/actions'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    values.counters = {}
    values.users.forEach((user) => {
      if (user.checked) {
        values.counters[user.user_id] = 0
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

    db.ref('tribes/' + tid + '/tasks/' + id).set(values)
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type: 'task',
        action,
        added: timestamp,
        user: auth.currentUser.uid,
        item: values,
        id,
      })
    })
    .then(() => {
      resolve()
      router.resetTo(routes.TASKS, dispatch)
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'submitTask',
        error,
      })
      reject({_error: 'request'})
    })
  })
}
