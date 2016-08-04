import router from '../router'
import routes from '../routes'

import {auth} from '../firebase'

import {
  LOGGED_IN,
  LOGGED_OUT,
  LOGIN_DESTINATION,
} from '../constants/actions'

import listenUser from './listenUser'

export const login = (user) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOGGED_IN,
      user,
    })

    dispatch(listenUser.on(user.uid))

    const destination = getState().login.destination || routes.ACTIVITY
    router.resetTo(destination, dispatch)

    const stop = auth.onAuthStateChanged((connectedUser) => {
      if (!connectedUser) {
        dispatch(logout()) // warning: exceptions are ignored here :/
        stop()
      }
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_OUT,
    })
    router.resetTo(routes.WELCOME, dispatch)
  }
}

export const setDestination = (destination) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_DESTINATION,
      destination,
    })
  }
}
