import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import saveLog from './saveLog'
import failure from './failure'

export default (id) => {
  return (dispatch) => {
    const uid = auth.currentUser.uid
    let task

    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/tasks/' + id).transaction((currentTask) => {
      if (currentTask) {
        currentTask.counters[uid]++
        currentTask.done = timestamp
        currentTask.done_by = uid
        task = currentTask
      }
      return currentTask
    })
    .then(() => {
      task.id = id
      return saveLog('task', 'done', task)
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(failure(error, 'postDone'))
    })
  }
}
