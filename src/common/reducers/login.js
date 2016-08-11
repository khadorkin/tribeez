import {
  LOGIN_DESTINATION,
  LOGIN_EMAIL,
  LOGGED_IN,
} from '../constants/actions'

const initialState = {
  destination: null,
  email: '', // localStorage
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGIN_DESTINATION:
      return {
        ...state,
        destination: action.destination,
      }
    case LOGGED_IN:
      return {
        ...state,
        email: action.user.email,
      }
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.email,
      }
    default:
      return state
  }
}
