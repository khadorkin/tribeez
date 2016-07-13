import {auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
} from '../constants/actions'

import {login} from './app'

let stop

const on = () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    stop = auth.onAuthStateChanged((user) => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      if (user) {
        dispatch(login(user))
      }
    })
  }
}

const off = () => {
  return () => {
    if (stop) {
      stop()
    }
  }
}

export default {on, off}
