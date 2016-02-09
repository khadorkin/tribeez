import api from '../api'

import { TOGGLE_MENU } from '../actions'

export const toggleMenu = (open) => {
  return function(dispatch) {
    dispatch({
      type: TOGGLE_MENU,
      open,
    })
  }
}
