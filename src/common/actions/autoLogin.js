import {auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
} from '../constants/actions'

import {login} from './auth'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    const stop = auth.onAuthStateChanged((user) => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      if (user) {
        dispatch(login(user))
      }
      stop()
    })
  }
}
