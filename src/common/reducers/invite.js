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
      return {
        ...state,
        loading: true,
        error: null,
      }
    case INVITE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      }
    case INVITE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
