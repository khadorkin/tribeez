import {LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState, {})
    case LOGOUT_FAILURE:
      return Object.assign({}, initialState, {
        error: action.error,
      })
    default:
      return state
  }
}
