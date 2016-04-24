import {
  GET_POLLS_REQUEST,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_SUCCESS,
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
  current: null, // current poll being edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
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
    case GET_POLLS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case GET_POLL_SUCCESS:
      return {
        ...state,
        current: action.data,
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

    // toggle active:
    case PUT_POLL_SUCCESS: {
      const items = state.items.map((poll) => {
        if (poll.id === action.data.id) {
          return {...poll, active: action.data.active}
        }
        return poll
      })
      return {
        ...state,
        items,
      }
    }

    // vote:
    case POST_VOTE_SUCCESS: {
      const items = state.items.slice()
      items.forEach((poll) => {
        if (poll.id === action.id) {
          poll.answers[action.uid] = action.choices
        }
      })
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
