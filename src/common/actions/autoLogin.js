import {auth} from '../firebase'
import storage from '../storage'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  LOGIN_EMAIL,
} from '../constants/actions'

import {login} from './auth'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    storage.get('login')
    .then((value) => {
      dispatch({
        type: LOGIN_EMAIL,
        value: value || '',
      })
    })
    .catch(() => {}) // ignore fails

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
