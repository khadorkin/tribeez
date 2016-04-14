import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
  NEW_BILL,
  UPDATE_BILL,
  GET_BILL_SUCCESS,
  DELETE_BILL,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
  current: null, // current bill being edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_BILLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_BILLS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        list: action.list,
        got: true,
      }
    case GET_BILLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_BILL_SUCCESS:
      return {
        ...state,
        current: action.data,
      }

    // from socket.io:
    case NEW_BILL: {
      const list = [action.data, ...state.list]
      return {
        ...state,
        list,
      }
    }
    case UPDATE_BILL: {
      const list = state.list.map((bill) => {
        if (bill.id === action.data.id) {
          return action.data
        }
        return bill
      })
      return {
        ...state,
        list,
      }
    }
    case DELETE_BILL: {
      const list = state.list.filter((bill) => bill.id !== action.data.id)
      return {
        ...state,
        list,
      }
    }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
