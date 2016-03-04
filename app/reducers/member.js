import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  UPDATE_PROFILE_DATA,
  LOGOUT_SUCCESS,
  NEW_TRIBE_SUCCESS,
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
    case UPDATE_PROFILE_DATA:
      const user = Object.assign({}, state.user)
      //user.tribes = user.tribes.slice()
      if (action.data.email !== undefined) {
        user.email = action.data.email
      }
      if (action.data.name !== undefined) {
        user.name = action.data.name
      }
      if (action.data.phone !== undefined) {
        user.phone = action.data.phone
      }
      if (action.data.birthdate !== undefined) {
        user.birthdate = action.data.birthdate
      }
      return Object.assign({}, state, {
        user,
      })
    case PUT_PROFILE_SUCCESS:
      const tribe = Object.assign({}, state.tribe)
      tribe.users = state.tribe.users.map((u) => {
        if (u.id === state.user.id) {
          return Object.assign(u, action.payload)
        }
        return u
      })
      return Object.assign({}, state, {
        tribe,
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
