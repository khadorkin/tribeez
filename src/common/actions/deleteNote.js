import {db, auth} from '../firebase'

import {
  REQUEST,
  SUCCESS,
  SNACK_MESSAGE,
} from '../constants/actions'

import failure from './failure'

export default (id) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/notes/' + id).remove()
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'note_deleted',
      })
    })
    .catch((error) => {
      dispatch(failure(error, 'deleteNote'))
      dispatch({
        type: SNACK_MESSAGE,
        message: 'error',
      })
    })
  }
}
