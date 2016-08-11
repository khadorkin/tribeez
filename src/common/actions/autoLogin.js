import {auth} from '../firebase'
import storage from '../storage'

import {
  REQUEST,
  SUCCESS,
  LOGIN_EMAIL,
} from '../constants/actions'

import {login} from './auth'

export default () => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })

    storage.get('login')
    .then((value) => {
      dispatch({
        type: LOGIN_EMAIL,
        email: value || '',
      })
    })
    .catch(() => {}) // ignore fails

    const stop = auth.onAuthStateChanged((user) => {
      dispatch({
        type: SUCCESS,
      })
      if (user) {
        dispatch(login(user))
      }
      stop()
    })
  }
}
