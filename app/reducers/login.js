import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

const initialState = {
  loading: false,
  email: undefined,
  token: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        email: action.email,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        email: action.email,
        token: action.token,
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        email: action.email,
        token: undefined, // reset
      })
    default:
      return state
  }
}
