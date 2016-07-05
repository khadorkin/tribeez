import {
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  current: null, // current bill being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_BILL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_BILL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
