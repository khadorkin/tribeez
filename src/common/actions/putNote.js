import {db, auth, timestamp} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  PUT_NOTE_SUCCESS,
} from '../constants/actions'

import report from './error'

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
        type: PUT_NOTE_SUCCESS,
        data,
      })
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'putNote'))
    })
  }
}
