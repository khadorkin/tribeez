import router from '../router'

import {db, auth} from '../firebase'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  CLOSE_SNACK,
  UPDATE_LANG,
  LOGGED_IN,
  LOGGED_OUT,
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
} from '../constants/actions'

import getMember from './getMember'

export const login = (user, destination) => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      user,
    })
    dispatch(getMember.on(user.uid))
    router.resetTo(destination, dispatch)
  }
}

export const logout = (destination) => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_OUT,
    })
    dispatch(getMember.off())
    if (destination) {
      router.resetTo(destination, dispatch)
    }
  }
}

export const toggleMenu = (open) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MENU,
      open,
    })
  }
}
export const toggleTribes = (open) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TRIBES,
      open,
    })
  }
}

export const resize = () => {
  return (dispatch) => {
    dispatch({
      type: RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
}

export const closeSnack = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SNACK,
    })
  }
}

export const updateLang = (lang) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LANG,
      lang,
    })
  }
}

export const setLastViewedHistoryKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/members/' + auth.currentUser.uid + '/last_viewed_history_key').set(key)
    .then(() => {
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'setLastViewedHistoryKey',
        error,
      })
    })
  }
}
