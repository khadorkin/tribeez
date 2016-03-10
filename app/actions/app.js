import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  CLOSE_SNACK,
  UPDATE_LANG,
} from '../constants/actions'

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
