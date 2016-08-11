import {db, auth, timestamp} from '../firebase'

import {
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  COMMENT_FAILURE,
} from '../constants/actions'

import report from './error'

export default (type, item, text) => {
  return (dispatch) => {
    dispatch({
      type: COMMENT_REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/' + type + 's/' + item.id + '/log').push({
      action: 'comment',
      time: timestamp,
      author: auth.currentUser.uid,
      text,
    })
    .then(() => {
      dispatch({
        type: COMMENT_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'postComment'))
      dispatch({
        type: COMMENT_FAILURE,
      })
    })
  }
}
