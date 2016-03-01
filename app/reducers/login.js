import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_DESTINATION} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  destination: null,
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
    case LOGIN_DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination,
      })
    default:
      return state
  }
}
