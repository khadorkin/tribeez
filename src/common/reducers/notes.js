import {
  PUT_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  MOVE_NOTE,
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

    case SWITCH_SUCCESS:
    case LOGOUT_SUCCESS:
      return {...initialState}
    default:
      return state
  }
}
