import { UPDATE_LOCATION } from 'react-router-redux'

import { TOGGLE_MENU } from '../actions'

const initialState = {
  menu_visible: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return Object.assign({}, initialState, {
        menu_visible: false,
      })
    case TOGGLE_MENU:
      return Object.assign({}, initialState, {
        menu_visible: action.open,
      })
    default:
      return state
  }
}
