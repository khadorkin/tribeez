import {
  GET_MEMBER_SUCCESS,
  UPDATE_LANG,
} from '../constants/actions'

import {actionTypes as formActions} from 'redux-form'

import lang from './lang'

const userPlugin = (state, action) => {
  switch (action.type) {
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        lang: {value: action.user.lang},
      }
    case UPDATE_LANG:
      return {
        ...state,
        lang: {value: action.lang},
      }
    case formActions.DESTROY:
      return {
        lang: {value: lang.get()},
      }
    case formActions.INITIALIZE:
      return {
        ...state,
        lang: {value: lang.get()},
      }
    default:
      return state
  }
}

const pollPlugin = (state, action) => {
  switch (action.type) {
    case formActions.CHANGE:
      if (action.form === 'poll' && action.field.indexOf('options') === 0) {
        const last = state.options[state.options.length - 1]
        if (last.value) {
          return {
            ...state,
            options: [...state.options, {value: ''}],
          }
        }
      }
      return state
    default:
      return state
  }
}

export default {
  register: userPlugin,
  join: userPlugin,
  poll: pollPlugin,
}
