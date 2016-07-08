import md5 from 'md5'

import {
  LOGGED_IN,
  USER_UPDATED,
  LOGGED_OUT,
} from '../constants/actions'

const initialState = {
  loading: true,
  error: null,
  tribes: [],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGGED_IN:
      if (window.ga) {
        ga('set', 'userId', action.user.uid)
      }
      return {
        ...state,
        loading: false,
        error: null,
        uid: action.user.uid,
        email: action.user.email,
        gravatar: md5(action.user.email),
      }

    case USER_UPDATED:
      return {
        ...state,
        ...action.user,
      }

    case LOGGED_OUT:
      return {
        ...initialState,
        loading: false,
      }
    default:
      return state
  }
}
