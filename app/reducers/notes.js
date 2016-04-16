import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  NEW_NOTE_SUCCESS,
  PUT_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  MOVE_NOTE,
  LOGOUT_SUCCESS,
} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
  items: [],
  pages: 0,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_NOTES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: [...state.items, ...action.data.items],
        pages: state.pages + 1,
      }
    case GET_NOTES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case NEW_NOTE_SUCCESS: {
      const items = state.items.slice()
      items.unshift(action.data)
      return {
        ...state,
        items,
      }
    }
    case PUT_NOTE_SUCCESS: {
      const items = state.items.map((item) => {
        if (item.id === action.data.id) {
          action.data.saved = true
          return action.data
        }
        return item
      })
      return {
        ...state,
        items,
      }
    }
    case DELETE_NOTE_SUCCESS: {
      const items = state.items.filter((note) => note.id !== action.id)
      return {
        ...state,
        items,
      }
    }
    case MOVE_NOTE: {
      const items = state.items.map((note) => {
        if (note.id === action.hoveredNote.id) {
          return action.draggedNote
        }
        if (note.id === action.draggedNote.id) {
          return action.hoveredNote
        }
        return note
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
