import router from '../router'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  CLOSE_SNACK,
  UPDATE_LANG,
  LOGIN,
  LOGOUT,
} from '../constants/actions'

import getMember from './getMember'

export const login = (user, destination) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      user,
    })
    dispatch(getMember(user.uid))
    router.resetTo(destination, dispatch)
  }
}

export const logout = (destination) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT,
    })
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
