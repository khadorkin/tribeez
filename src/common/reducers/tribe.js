import {
  SYNC_TRIBE_REQUEST,
  TRIBE_UPDATED,
  SYNC_TRIBE_FAILURE,
  MEMBER_ADDED,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  users: [],
  userMap: {},
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
      }
    case SYNC_TRIBE_FAILURE:
      return {
        ...state,
        loading: false,
        error: 'firebase.error.' + action.error,
      }
    case MEMBER_ADDED:
      const users = [...state.users, action.member]
      const userMap = {...state.userMap, [action.member.uid]: action.member}
      return {
        ...state,
        users,
        userMap,
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
