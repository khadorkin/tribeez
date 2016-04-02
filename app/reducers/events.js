import {
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAILURE,
  NEW_EVENT_SUCCESS,
  DELETE_EVENT_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
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
        list: action.list.map((event) => ({
          start: new Date(event.start),
          end: new Date(event.end),
          title: event.name,
          desc: event.description,
        })),
        got: true,
      })
    case GET_EVENTS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case NEW_EVENT_SUCCESS: {
      const list = state.list.slice()
      list.push(action.data)
      return {...state, list}
    }
    case DELETE_EVENT_SUCCESS: {
      const list = state.list.filter((event) => event.id !== action.id)
      return {...state, list}
    }
    default:
      return state
  }
}
