import {
  GET_POLLS_REQUEST,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_REQUEST,
  GET_POLL_SUCCESS,
  GET_POLL_FAILURE,
  NEW_POLL,
  UPDATE_POLL,
  DELETE_POLL,
  POST_VOTE_SUCCESS,
  SOCKET_STATUS,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  paging: null,
  current: null, // current poll being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_POLL_REQUEST:
    case GET_POLLS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_POLLS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
        paging: action.data.paging || state.paging,
      }
    case GET_POLL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_POLLS_FAILURE:
    case GET_POLL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    // from socket.io:
    case NEW_POLL: {
      const items = [action.data, ...state.items]
      return {
        ...state,
        items,
      }
    }
    case UPDATE_POLL: {
      const items = state.items.map((poll) => {
        if (poll.id === action.data.id) {
          return {...poll, ...action.data}
        }
        return poll
      })
      return {
        ...state,
        items,
      }
    }
    case DELETE_POLL: {
      const items = state.items.filter((poll) => poll.id !== action.data.id)
      return {
        ...state,
        items,
      }
    }

    // vote:
    case POST_VOTE_SUCCESS: {
      const items = state.items.map((item) => {
        if (item.id === action.id) {
          const answers = {...item.answers}
          answers[action.uid] = action.choices
          return {...item, answers}
        }
        return item
      })
      return {
        ...state,
        items,
      }
    }

    case SOCKET_STATUS:
      if (action.status !== 'connected' && action.path !== 'events') {
        return {...initialState}
      }
      return state

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
