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
  error: null,
  items: [],
  pages: 0,
  paging: null,
  // extras:
  events: [],
  polls: [],
  boxComments: {},
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_ACTIVITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, ...action.data.items],
        pages: state.pages + 1,
        paging: action.data.paging || state.paging,
        events: action.data.events || state.events,
        polls: action.data.polls || state.polls,
      }
    case GET_ACTIVITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    case COMMENT_SUCCESS:
      const items = state.items.slice() // copy
      items.forEach((entry) => {
        if (entry.id === action.entry_id) {
          entry.comments = [...entry.comments, action.data] // copy + push
        }
      })
      boxComments = {...state.boxComments}
      boxComments[action.entry_id] = '' // reset
      return {
        ...state,
        items,
        boxComments,
      }
    case UPDATE_COMMENT_TEXT:
      boxComments = {...state.boxComments}
      boxComments[action.entry_id] = action.content
      return {
        ...state,
        boxComments,
      }

    case POST_VOTE_SUCCESS: {
      const polls = state.polls.slice()
      polls.forEach((poll) => {
        if (poll.id === action.id) {
          poll.answers[action.uid] = action.choices
        }
      })
      return {
        ...state,
        polls,
      }
    }

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
      return {
        ...state,
        items: [],
        pages: 0,
        events: [],
        polls: [],
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
