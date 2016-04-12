import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  NEW_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  MOVE_NOTE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  list: [],
  error: null,
  got: false, // true = we got the initial list through a request
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: null,
      })
    case GET_NOTES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: null,
        list: action.list,
        got: true,
      })
    case GET_NOTES_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.error,
      })
    case NEW_NOTE_SUCCESS: {
      const list = state.list.slice()
      list.unshift(action.data)
      return {...state, list}
    }
    case DELETE_NOTE_SUCCESS: {
      const list = state.list.filter((note) => note.id !== action.id)
      return {...state, list}
    }
    case MOVE_NOTE: {
      const list = state.list.map((note) => {
        if (note.id === action.hoveredNote.id) {
          return action.draggedNote
        }
        if (note.id === action.draggedNote.id) {
          return action.hoveredNote
        }
        return note
      })
      return {...state, list}
    }

    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
