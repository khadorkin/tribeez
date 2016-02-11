import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE, UPDATE_JOIN_DATA, JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE } from '../actions'

const initialState = {
  loading: false,
  data: {},
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_INVITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        data: action.data,
      })
    case GET_INVITE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case UPDATE_JOIN_DATA:
      let data = Object.assign({}, state.data)
      if (action.data.email !== undefined) {
        data.email = action.data.email
      }
      return Object.assign({}, state, {
        data,
      })
    case JOIN_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case JOIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      })
    case JOIN_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}
