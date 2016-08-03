import {
  ACTIVITY,
  ACTIVITY_ADDED,
  ACTIVITY_CHANGED,
  ACTIVITY_REMOVED,
} from '../constants/actions'

const initialState = {
  members: [],
  polls: [],
  tasks: [],
  events: [],
  bills: [],
  notes: [],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case ACTIVITY:
      return {
        ...state,
        ...action.data,
      }
    case ACTIVITY_ADDED:
      return {
        ...state,
        [action.in]: state[action.in].concat(action.row),
      }
    case ACTIVITY_CHANGED:
      return {
        ...state,
        [action.in]: state[action.in].map((row) => {
          if (row.id === action.row.id) {
            return action.row
          }
          return row
        }),
      }
    case ACTIVITY_REMOVED:
      return {
        ...state,
        [action.in]: state[action.in].filter((row) => (row.id !== action.row.id)),
      }
    default:
      return state
  }
}
