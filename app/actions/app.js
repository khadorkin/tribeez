import {TOGGLE_MENU, TOGGLE_TRIBES, RESIZE} from '../constants/actions'

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
