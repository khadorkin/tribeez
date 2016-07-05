import md5 from 'md5'

import {
  LOGIN,
  USER_UPDATED,
  LOGOUT,
} from '../constants/actions'

const initialState = {
  loading: true,
  error: null,
  tribes: [],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGIN:
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

    case LOGOUT:
      return {
        ...initialState,
        loading: false,
      }
    default:
      return state
  }
}
