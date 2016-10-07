import {
  GET_MEMBER_SUCCESS,
  UPDATE_LANG,
} from '../constants/actions'

import {actionTypes} from 'redux-form'

const userPlugin = (state, action) => {
  switch (action.type) {
    case GET_MEMBER_SUCCESS:
      return {
        ...state,
        values: {
          ...state.values,
          lang: action.user.lang,
        },
      }
    case UPDATE_LANG:
      return {
        ...state,
        values: {
          ...state.values,
          lang: action.lang,
        },
      }
    default:
      return state
  }
}

const pollPlugin = (state, action) => {
  switch (action.type) {
    case actionTypes.CHANGE:
      const {form, field} = action.meta
      if (form === 'poll' && field.indexOf('options') === 0) {
        const {options} = state.values
        if (options[options.length - 1]) { // last option not empty => create another one below
          return {
            ...state,
            values: {
              ...state.values,
              options: [...options, ''],
            },
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
