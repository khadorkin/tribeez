import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  UPDATE_COMMENT_TEXT,
} from '../constants/actions'

import failure from './failure'

export default (type, item, text) => {
  return (dispatch) => {
    const tid = auth.currentUser.tid
    const uid = auth.currentUser.uid

    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + tid + '/' + type + 's/' + item.id + '/log').push({
      action: 'comment',
      time: timestamp,
      author: uid,
      text,
    })
    .then(() => {
      return db.ref('tribes/' + tid + '/history').push({
        type,
        action: 'comment',
        time: timestamp,
        author: uid,
        item: {
          id: item.id,
          name: item.name,
          text,
        },
      })
    })
    .then(() => {
      // recipients of a notification are: the author of the item, its updaters, and commenters:
      const recipients = {[item.author]: true}
      for (const id in item.log) {
        const entry = item.log[id]
        recipients[entry.author] = true
      }
      recipients[uid] = null // do not send to the author of the comment

      return db.ref('notifications/comment').push({
        name: item.name,
        text,
        recipients,
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
