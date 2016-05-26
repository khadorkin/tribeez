import {LOCATION_CHANGE} from 'react-router-redux'

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
  snack: {
    open: false,
    message: null,
    author: null,
    name: null,
  },
  submitting: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        menu_visible: false,
      }
    case TOGGLE_MENU:
      return {
        ...state,
        menu_visible: action.open,
        menu_tribes: false,
      }
    case TOGGLE_TRIBES:
      return {
        ...state,
        menu_tribes: action.open,
      }
    case RESIZE:
      return {
        ...state,
        width: action.width,
        height: action.height,
      }
    case GET_MEMBER_SUCCESS:
      lang.set(action.user.lang)
      return {
        ...state,
        lang: action.user.lang,
        messages: messages[action.user.lang],
      }
    case UPDATE_LANG:
      lang.set(action.lang)
      return {
        ...state,
        lang: action.lang,
        messages: messages[action.lang],
      }
    case SNACK_MESSAGE:
      const snack = {
        open: true,
        message: action.message,
        author: action.author,
        name: action.name,
      }
      return {...state, snack}
    case CLOSE_SNACK:
      return {
        ...state,
        snack: {...initialState.snack},
      }
    case formActions.CHANGE:
      if (['register', 'join', 'profile'].includes(action.form) && action.field === 'lang') {
        lang.set(action.value)
        return {
          ...state,
          lang: action.value,
          messages: messages[action.value],
        }
      }
      return state
    case formActions.START_SUBMIT:
      return {
        ...state,
        submitting: true,
      }
    case formActions.STOP_SUBMIT:
      return {
        ...state,
        submitting: false,
      }
    default:
      return state
  }
}
