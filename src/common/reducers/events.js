import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  current: null, // current event being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_EVENT_FAILURE:
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
