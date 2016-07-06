import {
  SYNC_TRIBE_REQUEST,
  TRIBE_UPDATED,
  SYNC_TRIBE_FAILURE,
  MEMBER_ADDED,
  MEMBER_UPDATED,
  LOGOUT_SUCCESS,
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
  error: null,
  users: [],
  userMap: {},
  formats: getFormats('USD'),
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case SYNC_TRIBE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case TRIBE_UPDATED:
      return {
        ...state,
        ...action.tribe,
        loading: false,
        error: null,
        formats: getFormats(action.tribe.currency),
      }
    case SYNC_TRIBE_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'firebase.error.' + action.error,
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

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
