import { GET_INVITE_REQUEST, GET_INVITE_SUCCESS, GET_INVITE_FAILURE } from '../actions'

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
    default:
      return state
  }
}
