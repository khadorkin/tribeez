import { PASSWORD_REQUEST, PASSWORD_SUCCESS, PASSWORD_FAILURE } from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  sent: false,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case PASSWORD_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case PASSWORD_SUCCESS:
      return Object.assign({}, initialState, {
        sent: true,
      })
    case PASSWORD_FAILURE:
      return Object.assign({}, initialState, {
        error: action.error,
      })
    default:
      return state
  }
}
