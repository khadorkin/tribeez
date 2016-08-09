import {
  LOGIN_DESTINATION,
  LOGIN_EMAIL,
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
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.value,
      }
    default:
      return state
  }
}
