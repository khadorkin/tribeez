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
  DELETE_POLL,
  PUT_POLL_SUCCESS,
  POST_VOTE_SUCCESS,
  NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  POST_DONE_SUCCESS,
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
  tasks: [],
  boxComments: {},
}

const createActivity = (action) => {
  const types = action.type.toLowerCase().split('_')
  return {
    type: types[1],
    action: types[0],
    added: Date.now(),
    comments: [],
    data: action.data,
    id: action.data.activity_id,
    item_id: action.data.id,
    user_id: action.author,
  }
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
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
        events: action.data.events || state.events,
        polls: action.data.polls || state.polls,
        tasks: action.data.tasks || state.tasks,
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

    case POST_DONE_SUCCESS:
      const tasks = state.tasks.filter((task) => task.id !== action.id)
      return {
        ...state,
        tasks,
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
    case NEW_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
    case PUT_POLL_SUCCESS:
      return {
        ...state,
        items: [createActivity(action), ...state.items],
      }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
