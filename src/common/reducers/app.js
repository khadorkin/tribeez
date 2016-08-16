import {LOCATION_CHANGE} from 'react-router-redux'

import {actionTypes as formActions} from 'redux-form'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  USER_UPDATED,
  UPDATE_LANG,
  SNACK_MESSAGE,
  CLOSE_SNACK,
  REQUEST,
  SUCCESS,
  FAILURE,
  UNREAD,
  ALERT,
  CLOSE_ALERT,
  CONFIG,
} from '../constants/actions'

import {getLang, setLang} from '../utils/locale'
import messages from '../messages' //TODO

const defaultLang = getLang()

const initialState = {
  menu_visible: false,
  menu_tribes: false,
  lang: defaultLang,
  messages: messages[defaultLang],
  width: window.innerWidth,
  height: window.innerHeight,
  snack: {
    open: false,
  },
  alert: {
    open: false,
  },
  unread: 0,
  loading: 0,
  submitting: false,
  error: null,
  config: null,
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
    case USER_UPDATED: {
      const lang = action.user.lang
      if (lang) {
        setLang(lang)
        return {
          ...state,
          lang,
          messages: messages[lang],
        }
      }
      return state
    }
    case UPDATE_LANG: {
      const lang = action.lang
      setLang(lang)
      return {
        ...state,
        lang,
        messages: messages[lang],
      }
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
    case ALERT:
      return {
        ...state,
        alert: {
          open: true,
          ...action.options,
        },
      }
    case CLOSE_ALERT:
      return {
        ...state,
        alert: {...initialState.alert},
      }
    case CONFIG:
      return {
        ...state,
        config: action.config,
      }
    case UNREAD:
      return {
        ...state,
        unread: action.count,
      }
    case REQUEST:
      return {
        ...state,
        loading: state.loading + 1,
      }
    case SUCCESS:
      return {
        ...state,
        loading: Math.max(0, state.loading - 1),
        error: null,
      }
    case FAILURE:
      return {
        ...state,
        loading: Math.max(0, state.loading - 1),
        error: action.error,
      }
    case formActions.CHANGE: {
      if (['register', 'join', 'profile'].includes(action.form) && action.field === 'lang') {
        const lang = action.value
        setLang(lang)
        return {
          ...state,
          lang,
          messages: messages[lang],
        }
      }
      return state
    }
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
