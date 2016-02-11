import { GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT_SUCCESS } from '../actions'

const initialState = {
  loading: false,
  data: {},
  tribe: {
    users: [],
  },
  error: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case GET_USER_SUCCESS:
      return Object.assign({}, initialState, {
        data: action.user,
        tribe: action.tribe,
      })
    case GET_USER_FAILURE:
      return Object.assign({}, initialState, {
        error: true,
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
