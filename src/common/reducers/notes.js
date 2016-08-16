import {
  GET_NOTES_SUCCESS,
  PUT_NOTE_SUCCESS,
  DELETE_NOTE_SUCCESS,
  MOVE_NOTE,
  LOGGED_OUT,
} from '../constants/actions'

const initialState = {
  items: [],
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS: {
      const items = []
      for (const key in action.notes) {
        const item = action.notes[key]
        item.id = key
        items.push(item)
      }
      return {
        ...state,
        items: items.sort((a, b) => (a.position < b.position ? -1 : 1)),
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

    case LOGGED_OUT:
      return {...initialState}
    default:
      return state
  }
}
