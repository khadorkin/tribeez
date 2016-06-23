import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.data.items,
      }
    case GET_ACTIVITY_FAILURE:
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
