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
  error: null,
  items: [],
  pages: 0,
  paging: null,
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
        items: [...state.items, ...action.data.items],
        pages: state.pages + 1,
        paging: action.data.paging || state.paging,
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
      const items = [action.data, ...state.items]
      return {
        ...state,
        items,
      }
    }
    case UPDATE_BILL: {
      const items = state.items.map((bill) => {
        if (bill.id === action.data.id) {
          return action.data
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

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
