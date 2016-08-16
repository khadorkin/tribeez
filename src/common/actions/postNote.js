import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import report from './error'

export default (values) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })

    values.updated = timestamp
    values.author = auth.currentUser.uid

    db.ref('tribes/' + auth.currentUser.tid + '/notes').push(values)
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'postNote'))
    })
  }
}
