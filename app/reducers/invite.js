import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE, UPDATE_JOIN_DATA } from '../actions'

const initialState = {
  loading: false,
  data: {},
  error: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case GET_INVITE_SUCCESS:
      return Object.assign({}, initialState, {
        data: action.data,
      })
    case GET_INVITE_FAILURE:
      return Object.assign({}, initialState, {
        error: true,
      })
    case UPDATE_JOIN_DATA:
      let data = Object.assign({}, state.data)
      if (action.data.email) {
        data.email = action.data.email
      }
      if (action.data.lang) {
        data.lang = action.data.lang
      }
      return Object.assign({}, state, {
        data,
      })
    default:
      return state
  }
}
