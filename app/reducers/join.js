import { JOIN_REQUEST, JOIN_SUCCESS, JOIN_FAILURE } from '../actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case JOIN_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case JOIN_SUCCESS:
      return Object.assign({}, initialState)
    case JOIN_FAILURE:
      return Object.assign({}, initialState, {
        error: action.error,
      })
    default:
      return state
  }
}
