import {
  GET_NOTES_REQUEST,
  GET_NOTES_SUCCESS,
  GET_NOTES_FAILURE,
  NEW_NOTE_SUCCESS,
  PUT_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  MOVE_NOTE,
  SOCKET_STATUS,
  SWITCH_SUCCESS,
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
        items: action.page ? [...state.items, ...action.data.items] : action.data.items,
        pages: action.page + 1,
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
          return {...item, ...action.data, saved: true}
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
      if (action.hoveredNote) { // web
        state.items.forEach((note, index) => {
          if (note.id === action.draggedNote.id) {
            action.from = index
          }
          if (note.id === action.hoveredNote.id) {
            action.to = index
          }
        })
      }
      const items = state.items.slice()
      items.splice(action.from, 1) // remove from here
      items.splice(action.to, 0, action.draggedNote) // add here
      return {
        ...state,
        items,
      }
    }

    case SOCKET_STATUS:
      if (action.status !== 'connected' && action.path !== 'notes') {
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
