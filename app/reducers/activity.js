import {GET_ACTIVITY_REQUEST, GET_ACTIVITY_SUCCESS, GET_ACTIVITY_FAILURE, COMMENT_SUCCESS, UPDATE_COMMENT_TEXT} from '../constants/actions'

const initialState = {
  loading: false,
  entries: [],
  error: null,
  boxComments: {},
}

export default (state = initialState, action = null) => {
  let boxComments
  switch (action.type) {
    case GET_ACTIVITY_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        entries: [],
        error: null,
      })
    case GET_ACTIVITY_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        entries: action.entries,
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
    default:
      return state
  }
}
