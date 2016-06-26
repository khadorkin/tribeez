import {
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
  NEW_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  POST_DONE_SUCCESS,
  SWITCH_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
  current: null, // current task being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
    case GET_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
      }
    case GET_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_TASK_FAILURE:
    case GET_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }

    // from socket.io:
    case NEW_TASK: {
      const items = [...state.items, action.data]
      return {
        ...state,
        items,
      }
    }
    case UPDATE_TASK: {
      const items = state.items.map((task) => {
        if (task.id === action.data.id) {
          return {...task, ...action.data}
        }
        return task
      })
      return {
        ...state,
        items,
      }
    }
    case DELETE_TASK: {
      const items = state.items.filter((item) => item.id !== action.data.id)
      return {
        ...state,
        items,
      }
    }

    case POST_DONE_SUCCESS:
      const items = state.items.map((task) => {
        if (task.id === action.id) {
          const counters = {...task.counters}
          if (!counters[action.uid]) {
            counters[action.uid] = 1
          } else {
            counters[action.uid]++
          }
          const done = Date.now()
          return {...task, done, counters}
        }
        return task
      })
      return {
        ...state,
        items,
      }

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
