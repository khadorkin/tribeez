import {
  GET_INVITES_REQUEST,
  GET_INVITES_SUCCESS,
  GET_INVITES_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_INVITES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_INVITES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.list,
        got: true,
      }
    case GET_INVITES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
