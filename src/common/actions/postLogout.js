import {db, auth} from '../firebase'
import fcm from '../fcm'

import {
  REQUEST,
  SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import report from './error'

import listenActivity from './listenActivity'
import listenItem from './listenItem'
import listenNotes from './listenNotes'
import listenUser from './listenUser'

export default () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })

    const fcm_token = fcm.getToken()

    let promise
    if (fcm_token) {
      promise = db.ref('users_private/' + auth.currentUser.uid + '/fcm_tokens/' + fcm_token).remove()
    } else {
      promise = Promise.resolve()
    }

    promise
    .then(() => {
      dispatch(listenActivity.off())
      dispatch(listenItem.off())
      dispatch(listenNotes.off())
      dispatch(listenUser.off())
    })
    .then(() => {
      return auth.signOut() // this will trigger auth.logout (see listener in auth.login)
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'logout_success',
      })
    })
    .catch((error) => {
      dispatch(report(error, 'postLogout'))
    })
  }
}
