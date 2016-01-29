import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

const initialState = {
  loading: false,
  email: null,
  token: null,
  emailError: false,
  passwordError: false,
  otherError: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
        email: action.email,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, initialState, {
        email: action.email,
        token: action.token,
      })
    case LOGIN_FAILURE:
      return Object.assign({}, initialState, {
        loading: false,
        email: action.email,
        emailError: action.emailError,
        passwordError: action.passwordError,
        otherError: action.otherError,
      })
    default:
      return state
  }
}
