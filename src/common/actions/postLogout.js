import {auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

import getMember from './getMember'
import subscribe from './subscribe'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    dispatch(getMember.off())
    dispatch(subscribe.off())

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
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'postLogout',
        error,
      })
    })
  }
}
