import {
  GET_INVITE_SUCCESS,
  GET_INVITE_ERROR,
  LOGGED_IN,
} from '../constants/actions'

const initialState = {
  invite: null,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITE_SUCCESS:
      return {
        ...state,
        invite: action.data,
      }
    case GET_INVITE_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case LOGGED_IN:
      return {
        ...state,
        invite: null,
      }
    default:
      return state
  }
}
