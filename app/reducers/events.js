import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENT_SUCCESS,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  current: null, // current event being edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
      }
    case GET_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        current: action.data,
      }

    // from socket.io:
    case NEW_EVENT: {
      const items = [action.data, ...state.items]
      return {
        ...state,
        items,
      }
    }
    case UPDATE_EVENT: {
      const items = state.items.map((event) => {
        if (event.id === action.data.id) {
          return action.data
        }
        return event
      })
      return {
        ...state,
        items,
      }
    }
    case DELETE_EVENT: {
      const items = state.items.filter((event) => event.id !== action.data.id)
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
