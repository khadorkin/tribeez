import {UPDATE_COMMENT_TEXT} from '../constants/actions'

export default (content) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_COMMENT_TEXT,
      content,
    })
  }
}
