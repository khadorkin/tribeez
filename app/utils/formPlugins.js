import {
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  UPDATE_LANG,
} from '../constants/actions'

import lang from './lang'

const initialState = {
  lang: {
    value: lang.getDefault(),
  },
}

const plugin = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        lang: {value: action.user.lang},
      }
    case GET_MEMBER_FAILURE:
      return {
        ...initialState,
      }
    case UPDATE_LANG:
      return {
        ...state,
        lang: {value: action.lang},
      }
    default:
      return state
  }
}

export default {
  register: plugin,
}
