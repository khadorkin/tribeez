import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  UPDATE_COMMENT_TEXT,
} from '../constants/actions'

import failure from './failure'

export default (type, item, text) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/' + type + 's/' + item.id + '/log').push({
      action: 'comment',
      time: timestamp,
      author: auth.currentUser.uid,
      text,
    })
    .then(() => {
      return db.ref('tribes/' + auth.currentUser.tid + '/history').push({
        type,
        action: 'comment',
        time: timestamp,
        author: auth.currentUser.uid,
        item: {
          id: item.id,
          name: item.name,
          text,
        },
      })
    })
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
      dispatch({
        type: UPDATE_COMMENT_TEXT,
        content: '', // clear
      })
    })
    .catch((error) => {
      dispatch(failure(error, 'postComment'))
    })
  }
}
