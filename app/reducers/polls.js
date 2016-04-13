import {
  GET_POLLS_REQUEST,
  GET_POLLS_SUCCESS,
  GET_POLLS_FAILURE,
  GET_POLL_SUCCESS,
  NEW_POLL_SUCCESS,
  UPDATE_POLL_SUCCESS,
  PUT_POLL_SUCCESS,
  DELETE_POLL_SUCCESS,
  POST_VOTE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
  current: null, // current poll being edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_POLLS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_POLLS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        list: action.list,
        got: true,
      })
    case GET_POLLS_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case GET_POLL_SUCCESS:
      return {...state, current: action.data}

    case NEW_POLL_SUCCESS: {
      const list = state.list.slice()
      list.unshift(action.poll)
      return {...state, list}
    }
    case UPDATE_POLL_SUCCESS: {
      const list = state.list.map((poll) => {
        if (poll.id === action.poll.id) {
          return action.poll
        }
        return poll
      })
      return {...state, list}
    }
    case PUT_POLL_SUCCESS: {
      const list = state.list.map((poll) => {
        if (poll.id === action.data.id) {
          return {...poll, active: action.data.active}
        }
        return poll
      })
      return {...state, list}
    }
    case DELETE_POLL_SUCCESS: {
      const list = state.list.filter((poll) => poll.id !== action.id)
      return {...state, list}
    }

    case POST_VOTE_SUCCESS: {
      const list = state.list.slice()
      list.forEach((poll) => {
        if (poll.id === action.id) {
          poll.answers[action.uid] = action.choices
        }
      })
      return {...state, list}
    }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
