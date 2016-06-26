import {
  GET_BILLS_REQUEST,
  GET_BILLS_SUCCESS,
  GET_BILLS_FAILURE,
  GET_BILL_REQUEST,
  GET_BILL_SUCCESS,
  GET_BILL_FAILURE,
  NEW_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
  current: null, // current bill being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_BILLS_REQUEST:
    case GET_BILL_REQUEST:
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
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
      }
    case GET_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_BILLS_FAILURE:
    case GET_BILL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    // from socket.io:
    case NEW_BILL: {
      const items = [action.data, ...state.items]
      return {
        ...state,
        items,
      }
    }
    case UPDATE_BILL: {
      const items = state.items.map((bill) => {
        if (bill.id === action.data.id) {
          return {...bill, ...action.data}
        }
        return bill
      })
      return {
        ...state,
        items,
      }
    }
    case DELETE_BILL: {
      const items = state.items.filter((bill) => bill.id !== action.data.id)
      return {
        ...state,
        items,
      }
    }

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
