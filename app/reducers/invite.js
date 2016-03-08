import {
  INVITE_REQUEST,
  INVITE_SUCCESS,
  INVITE_FAILURE,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case INVITE_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case INVITE_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
      })
    case INVITE_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    default:
      return state
  }
}
