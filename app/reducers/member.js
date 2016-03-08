import md5 from 'md5'

import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  LOGOUT_SUCCESS,
  PUT_PROFILE_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  user: {
    tribes: [], // todo: immutability
  },
  tribe: {
    users: [], // todo: immutability
  },
  error: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_MEMBER_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      })
    case GET_MEMBER_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
        user: action.user,
        tribe: action.tribe,
      })
    case GET_MEMBER_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: true,
      })
    case PUT_PROFILE_SUCCESS:
      const user = Object.assign({}, state.user, {
        name: action.values.name,
        email: action.values.email,
        lang: action.values.lang,
        birthdate: action.values.birthdate,
        phone: action.values.phone,
        gravatar: md5(action.values.email),
      })
      delete user.tribes
      const tribe = Object.assign({}, state.tribe)
      tribe.users = state.tribe.users.map((u) => {
        const copy = Object.assign({}, u)
        if (copy.id === state.user.id) {
          return Object.assign(copy, user)
        }
        return copy
      })
      user.tribes = state.user.tribes.slice()
      return Object.assign({}, state, {
        user,
        tribe,
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
