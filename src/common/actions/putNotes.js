import {db, auth} from '../firebase'

import {
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import report from './error'

export default () => {
  return (dispatch, getState) => {
    dispatch({
      type: REQUEST,
    })

    const updates = {}
    getState().notes.items.forEach((note, index) => {
      updates[note.id + '/position'] = index
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes').update(updates)
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'putNotes'))
    })
  }
}
