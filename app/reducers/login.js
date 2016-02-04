import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, initialState, {})
    case LOGIN_FAILURE:
      return Object.assign({}, initialState, {
        error: action.error,
      })
    default:
      return state
  }
}
