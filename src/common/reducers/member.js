import md5 from 'md5'

import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  LOGOUT_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_TRIBE_SUCCESS,
} from '../constants/actions'

const getFormats = (currency) => ({
  number: {
    money: {
      style: 'currency',
      currency,
    },
  },
  date: {
    event: {
      month: 'long',
      day: 'numeric',
    },
  },
})

const initialState = {
  loading: false,
  user: {
    tribes: [], // todo: immutability
  },
  tribe: {
    users: [], // todo: immutability
    userMap: {},
  },
  error: false,
  formats: getFormats('USD'),
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case GET_MEMBER_SUCCESS:
      if (window.ga) {
        ga('set', 'userId', action.user.id)
      }
      action.tribe.userMap = {}
      action.tribe.users.forEach((user) => {
        action.tribe.userMap[user.id] = user
      })
      return {
        ...state,
        loading: false,
        error: false,
        user: action.user,
        tribe: action.tribe,
        formats: getFormats(action.tribe.currency),
      }
    case GET_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      }

    case UPDATE_PROFILE_SUCCESS: {
      const user = {
        ...state.user,
        name: action.values.name,
        email: action.values.email,
        lang: action.values.lang,
        birthdate: action.values.birthdate,
        phone: action.values.phone,
        gravatar: md5(action.values.email),
      }
      delete user.tribes
      const tribe = {...state.tribe}
      tribe.users = state.tribe.users.map((u) => {
        const copy = {...u}
        if (copy.id === user.id) {
          return {...copy, ...user}
        }
        return copy
      })
      user.tribes = state.user.tribes.slice()
      return {
        ...state,
        user,
        tribe,
      }
    }
    case UPDATE_TRIBE_SUCCESS: {
      const tribe = {
        id: action.values.id,
        name: action.values.tribe_name,
        type: action.values.tribe_type,
        currency: action.values.currency,
        city: action.values.city.name,
        country_code: action.values.city.country_code,
        place_id: action.values.city.place_id,
        users: state.tribe.users,
        userMap: state.tribe.userMap,
      }
      const user = {...state.user}
      user.tribes = state.user.tribes.map((item) => {
        const copy = {...item}
        if (copy.id === tribe.id) {
          copy.name = tribe.name
        }
        return copy
      })
      return {
        ...state,
        user,
        tribe,
        formats: getFormats(tribe.currency),
      }
    }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
