import { UPDATE_COMMENT_TEXT } from '../actions'

export default (entry_id, content) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_COMMENT_TEXT,
      entry_id,
      content,
    })
  }
}
