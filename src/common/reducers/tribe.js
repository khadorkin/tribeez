import {
  TRIBE_UPDATED,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  MEMBERS_REMOVED,
  LOGGED_OUT,
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
      let users = state.users
      let userMap = state.userMap
      if (action.user) {
        const augmentedUser = {...userMap[action.uid], ...action.user}
        users = users.map((user) => (user.uid === action.uid ? augmentedUser : user))
        userMap[action.uid] = augmentedUser
      }
      if (action.member) {
        users = users.map((user) => (user.uid === action.member.uid ? action.member : user))
        userMap = {...userMap, [action.member.uid]: action.member}
      }
      return {
        ...state,
        users,
        userMap,
      }
    }
    case MEMBERS_REMOVED:
      return {
        ...state,
        users: [],
        userMap: {},
      }

    case LOGGED_OUT:
      return {...initialState}
    default:
      return state
  }
}
