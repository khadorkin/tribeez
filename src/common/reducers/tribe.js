import {
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  LOGOUT,
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
  users: [],
  userMap: {},
  formats: getFormats('USD'),
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case TRIBE_UPDATED:
      return {
        ...state,
        ...action.tribe,
        formats: getFormats(action.tribe.currency),
      }
    case MEMBER_ADDED: {
      const users = [...state.users, action.member]
      const userMap = {...state.userMap, [action.member.uid]: action.member}
      return {
        ...state,
        users,
        userMap,
      }
    }
    case MEMBER_UPDATED: {
      const users = state.users.map((user) => (user.uid === action.member.uid ? action.member : user))
      const userMap = {...state.userMap, [action.member.uid]: action.member}
      return {
        ...state,
        users,
        userMap,
      }
    }

    case LOGOUT:
      return {...initialState}
    default:
      return state
  }
}
