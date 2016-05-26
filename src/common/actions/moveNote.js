import {MOVE_NOTE} from '../constants/actions'

export default (draggedNote, hoveredNote) => {
  return function(dispatch) {
    dispatch({
      type: MOVE_NOTE,
      draggedNote,
      hoveredNote,
    })
  }
}
