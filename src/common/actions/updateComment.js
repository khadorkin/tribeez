import {UPDATE_COMMENT_TEXT} from '../constants/actions'

export default (content) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_COMMENT_TEXT,
      content,
    })
  }
}
