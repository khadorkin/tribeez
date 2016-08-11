import {auth, db} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import router from '../router'
import routes from '../routes'

import report from './error'

export default (tid) => {
  return (dispatch) => {
    const uid = auth.currentUser.uid

    dispatch({
      type: REQUEST,
    })
    db.ref('users/' + uid + '/current_tribe').set(tid)
    .then(() => {
      router.resetTo(routes.ACTIVITY, dispatch)
      dispatch({
        type: SNACK_MESSAGE,
        message: 'switched',
      })
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'putSwitch'))
    })
  }
}
