import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import failure from './failure'

export default (id) => {
  return (dispatch) => {
    const uid = auth.currentUser.uid

    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/tasks/' + id).transaction((task) => {
      if (task) {
        task.counters[uid]++
        task.done = timestamp
        task.done_by = uid
      }
      return task
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
