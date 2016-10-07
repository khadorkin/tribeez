import {SubmissionError} from 'redux-form'

import router from '../router'
import routes from '../routes'

import {db, auth, timestamp} from '../firebase'

import saveLog from './saveLog'
import failure from './failure'

export default (values, dispatch) => {
  return new Promise((resolve, reject) => {
    const task = {
      name: values.name,
      description: values.description,
      wait: Number(values.wait),
      counters: {},
      added: values.added || timestamp,
      author: values.author,
    }
    values.users.forEach((user) => {
      if (user.checked) {
        task.counters[user.uid] = 0
      }
    })

    const tid = auth.currentUser.tid
    let id = values.id
    let action
    if (id) {
      action = 'update'
    } else {
      action = 'new'
      id = db.ref('tribes/' + tid + '/tasks').push().key
    }

    db.ref('tribes/' + tid + '/tasks/' + id).transaction((currentTask) => {
      // keep existing counters for selected participants:
      if (currentTask) {
        for (const key in task.counters) {
          if (currentTask.counters[key]) {
            task.counters[key] = currentTask.counters[key]
          }
        }
        task.log = currentTask.log
      }
      return task
    })
    .then(() => {
      task.id = id
      return saveLog('task', action, task)
    })
    .then(() => {
      if (action === 'new') {
        return db.ref('reminders/task/' + id).set(tid)
      }
      return true // nothing to update in the notification
    })
    .then(() => {
      resolve()
      router.resetTo(routes.TASKS, dispatch)
    })
    .catch((error) => {
      dispatch(failure(error, 'submitTask'))
      reject(new SubmissionError({_error: 'request'}))
    })
  })
}
