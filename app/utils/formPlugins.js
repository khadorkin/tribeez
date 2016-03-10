import {
  GET_MEMBER_SUCCESS,
  UPDATE_LANG,
} from '../constants/actions'

import {actionTypes as formActions} from 'redux-form'

import lang from './lang'

const plugin = (state, action) => {
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
        lang: {value: lang.getDefault()},
      }
    case formActions.INITIALIZE:
      return {
        ...state,
        lang: {value: lang.getDefault()},
      }
    default:
      return state
  }
}

export default {
  register: plugin,
  join: plugin,
}
