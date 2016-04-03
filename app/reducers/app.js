import {UPDATE_LOCATION} from 'react-router-redux'

import {actionTypes as formActions} from 'redux-form'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  GET_MEMBER_SUCCESS,
  UPDATE_LANG,
  SNACK_MESSAGE,
  CLOSE_SNACK,
} from '../constants/actions'

import lang from '../utils/lang'
import messages from '../messages' // TODO

const defaultLang = lang.get()

const initialState = {
  menu_visible: false,
  menu_tribes: false,
  lang: defaultLang,
  messages: messages[defaultLang],
  width: window.innerWidth,
  height: window.innerHeight,
  snack: false,
  snackMessage: null,
  submitting: false,
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
        menu_tribes: false,
      })
    case TOGGLE_TRIBES:
      return Object.assign({}, state, {
        menu_tribes: action.open,
      })
    case RESIZE:
      return Object.assign({}, state, {
        width: action.width,
        height: action.height,
      })
    case GET_MEMBER_SUCCESS:
      lang.set(action.user.lang)
      return Object.assign({}, state, {
        lang: action.user.lang,
        messages: messages[action.user.lang],
      })
    case UPDATE_LANG:
      lang.set(action.lang)
      return Object.assign({}, state, {
        lang: action.lang,
        messages: messages[action.lang],
      })
    case formActions.CHANGE:
      if (['register', 'join', 'profile'].includes(action.form) && action.field === 'lang') {
        lang.set(action.value)
        return Object.assign({}, state, {
          lang: action.value,
          messages: messages[action.value],
        })
      }
      return state
    case SNACK_MESSAGE:
      return Object.assign({}, state, {
        snack: true,
        snackMessage: action.message,
      })
    case CLOSE_SNACK:
      return Object.assign({}, state, {
        snack: false,
        snackMessage: null,
      })
    case formActions.START_SUBMIT:
      return Object.assign({}, state, {
        submitting: true,
      })
    case formActions.STOP_SUBMIT:
      return Object.assign({}, state, {
        submitting: false,
      })
    default:
      return state
  }
}
