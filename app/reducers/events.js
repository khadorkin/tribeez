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
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
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
        list: action.list,
        got: true,
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
      const list = [action.data, ...state.list]
      return {
        ...state,
        list,
      }
    }
    case UPDATE_EVENT: {
      const list = state.list.map((event) => {
        if (event.id === action.data.id) {
          return action.data
        }
        return event
      })
      return {
        ...state,
        list,
      }
    }
    case DELETE_EVENT: {
      const list = state.list.filter((event) => event.id !== action.data.id)
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
