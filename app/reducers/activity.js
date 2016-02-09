import { GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE } from '../actions'

const initialState = {
  loading: false,
  entries: [],
  error: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case GET_ACTIVITY_SUCCESS:
      return Object.assign({}, initialState, {
        entries: action.entries,
      })
    case GET_ACTIVITY_FAILURE:
      return Object.assign({}, initialState, {
        error: true,
      })
    default:
      return state
  }
}
