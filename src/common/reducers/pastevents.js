import {
  GET_PAST_EVENTS_REQUEST,
  GET_PAST_EVENTS_SUCCESS,
  GET_PAST_EVENTS_FAILURE,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_PAST_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_PAST_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
      }
    case GET_PAST_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    // from socket.io:
    case NEW_EVENT: {
      //TODO: check if it is a past event -__-'
      return state
    }
    case UPDATE_EVENT: {
      const items = state.items.map((event) => {
        if (event.id === action.data.id) {
          return {...event, ...action.data}
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

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
