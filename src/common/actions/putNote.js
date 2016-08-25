import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  PUT_NOTE,
} from '../constants/actions'

import failure from './failure'

export default (data) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes/' + data.id).set({
      title: data.title,
      content: data.content,
      position: data.position,
      updated: timestamp,
      author: auth.currentUser.uid,
    })
    .then(() => {
      dispatch({
        type: PUT_NOTE,
        data,
      })
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(failure(error, 'putNote'))
    })
  }
}
