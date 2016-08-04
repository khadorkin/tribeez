import {db, auth} from '../firebase'
import fcm from '../fcm'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import {firebaseError} from './error'

import listenUser from './listenUser'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
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
      dispatch(listenUser.off())
    })
    .then(() => {
      return auth.signOut() // this will trigger auth.logout (see listener in auth.login)
    })
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'logout_success',
      })
    })
    .catch((error) => {
      dispatch(firebaseError(error, 'postLogout'))
    })
  }
}
