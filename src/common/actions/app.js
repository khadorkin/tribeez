import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  SNACK_MESSAGE,
  CLOSE_SNACK,
  UPDATE_LANG,
  SOCKET_STATUS,
  LOGIN,
  LOGOUT,
} from '../constants/actions'

export const login = (user) => {
  return function(dispatch) {
    dispatch({
      type: LOGIN,
      user,
    })
  }
}

export const logout = () => {
  return function(dispatch) {
    dispatch({
      type: LOGOUT,
    })
  }
}

export const toggleMenu = (open) => {
  return function(dispatch) {
    dispatch({
      type: TOGGLE_MENU,
      open,
    })
  }
}
export const toggleTribes = (open) => {
  return function(dispatch) {
    dispatch({
      type: TOGGLE_TRIBES,
      open,
    })
  }
}

export const resize = () => {
  return function(dispatch) {
    dispatch({
      type: RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
}

export const closeSnack = () => {
  return function(dispatch) {
    dispatch({
      type: CLOSE_SNACK,
    })
  }
}

export const updateLang = (lang) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_LANG,
      lang,
    })
  }
}

export const setSocketStatus = (status, path) => {
  return (dispatch) => {
    dispatch({
      type: SOCKET_STATUS,
      status,
      path,
    })
  }
}

export const message = (msg) => {
  return function(dispatch) {
    if (msg.type) {
      dispatch(msg)
      dispatch({
        type: SNACK_MESSAGE,
        message: msg.type,
        author: msg.author,
        name: msg.data.name,
      })
    }
  }
}
