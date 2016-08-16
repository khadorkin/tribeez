import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import report from './error'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/tasks/' + id).transaction((task) => {
      task.counters[auth.currentUser.uid]++
      task.done = timestamp
      return task
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'postDone'))
    })
  }
}
