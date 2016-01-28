import { USER_REQUEST, USER_SUCCESS, USER_FAILURE } from '../actions'

const initialState = {
  loading: false,
  data: {},
  error: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case USER_SUCCESS:
      return Object.assign({}, initialState, {
        data: action.data,
      })
    case USER_FAILURE:
      return Object.assign({}, initialState, {
        error: true,
      })
    default:
      return state
  }
}
