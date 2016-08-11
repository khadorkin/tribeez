import {db} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  MEMBER_UPDATED,
} from '../constants/actions'

import report from './error'

export default (uid) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('users/' + uid).once('value')
    .then((snapshot) => {
      dispatch({
        type: MEMBER_UPDATED,
        user: snapshot.val(),
        uid,
      })
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'getUser'))
    })
  }
}
