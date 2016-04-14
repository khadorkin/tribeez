import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        //...state,
        loading: true,
        error: null,
      }
    case LOGOUT_SUCCESS:
      return {
        //...state,
        loading: false,
        error: null,
      }
    case LOGOUT_FAILURE:
      return {
        //...state,
        loading: false,
        error: action.error,
      }
    default:
      return state
  }
}
