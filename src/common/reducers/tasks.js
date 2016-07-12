import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
  POST_DONE_SUCCESS,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  current: null, // current task being viewed or edited
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        current: action.data,
      }
    case GET_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
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

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
