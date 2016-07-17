import {auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import {firebaseError} from './error'

import getMember from './getMember'
import getUnread from './getUnread'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    dispatch(getMember.off())
    dispatch(getUnread.off())

    // this will trigger auth.logout (see listener in auth.login):
    auth.signOut().then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'logout_success',
      })
    }, (error) => {
      dispatch(firebaseError(error, 'postLogout'))
    })
  }
}
