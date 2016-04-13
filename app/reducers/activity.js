import {
  GET_ACTIVITY_REQUEST,
  GET_ACTIVITY_SUCCESS,
  GET_ACTIVITY_FAILURE,
  COMMENT_SUCCESS,
  UPDATE_COMMENT_TEXT,
  NEW_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  NEW_EVENT,
  UPDATE_EVENT,
  DELETE_EVENT,
  NEW_POLL,
  UPDATE_POLL,
  PUT_POLL_SUCCESS,
  DELETE_POLL,
  POST_VOTE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  entries: [],
  events: [],
  polls: [],
  error: null,
  got: false,
  boxComments: {},
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        entries: action.data.entries,
        events: action.data.events,
        polls: action.data.polls,
        got: true,
      })
    case GET_ACTIVITY_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case COMMENT_SUCCESS:
      const entries = state.entries.slice() // copy
      entries.forEach((entry) => {
        if (entry.id === action.entry_id) {
          entry.comments = [...entry.comments, action.data] // copy + push
        }
      })
      boxComments = Object.assign({}, state.boxComments)
      boxComments[action.entry_id] = '' // reset
      return Object.assign({}, state, {
        entries,
        boxComments,
      })
    case UPDATE_COMMENT_TEXT:
      boxComments = Object.assign({}, state.boxComments)
      boxComments[action.entry_id] = action.content
      return Object.assign({}, state, {
        boxComments,
      })
    case NEW_BILL:
    case UPDATE_BILL:
    case DELETE_BILL:
    case NEW_EVENT:
    case UPDATE_EVENT:
    case DELETE_EVENT:
    case NEW_POLL:
    case UPDATE_POLL:
    case DELETE_POLL:
    case PUT_POLL_SUCCESS:
    case POST_VOTE_SUCCESS:
      return {...state, got: false}
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
