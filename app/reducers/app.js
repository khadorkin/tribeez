import { UPDATE_LOCATION } from 'react-router-redux'

import { TOGGLE_MENU, GET_USER_SUCCESS, GET_INVITE_SUCCESS } from '../actions'

import lang from '../utils/lang'

const initialState = {
  menu_visible: false,
  lang: lang.getDefault(),
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      return Object.assign({}, state, {
        menu_visible: false,
      })
    case TOGGLE_MENU:
      return Object.assign({}, state, {
        menu_visible: action.open,
      })
    case GET_USER_SUCCESS:
      return Object.assign({}, state, {
        lang: action.user.lang,
      })
    case GET_INVITE_SUCCESS:
      return Object.assign({}, state, {
        lang: action.data.lang,
      })
    default:
      return state
  }
}
