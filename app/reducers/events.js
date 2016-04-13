import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  GET_EVENT_SUCCESS,
  NEW_EVENT_SUCCESS,
  UPDATE_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
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
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_EVENTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        list: action.list,
        got: true,
      })
    case GET_EVENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case GET_EVENT_SUCCESS:
      return {...state, current: action.data}

    case NEW_EVENT_SUCCESS: {
      const list = state.list.slice()
      list.push(action.event)
      return {...state, list}
    }
    case UPDATE_EVENT_SUCCESS: {
      const list = state.list.map((event) => {
        if (event.id === action.event.id) {
          return action.event
        }
        return event
      })
      return {...state, list}
    }
    case DELETE_EVENT_SUCCESS: {
      const list = state.list.filter((event) => event.id !== action.id)
      return {...state, list}
    }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
