import api from '../api'

import { TOGGLE_MENU, RESIZE } from '../actions'

export const toggleMenu = (open) => {
  return function(dispatch) {
    dispatch({
      type: TOGGLE_MENU,
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
