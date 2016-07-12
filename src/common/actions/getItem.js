import {db, auth} from '../firebase'

import {
  FIREBASE_REQUEST,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  ITEM,
} from '../constants/actions'

export default (itemType, id) => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })

    db.ref('tribes/' + auth.currentUser.tid + '/' + itemType + 's/' + id).once('value')
    .then((snapshot) => {
      dispatch({
        type: ITEM,
        itemType,
        data: snapshot.val(),
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
    })
    .catch((error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'getItem/' + itemType,
        error,
      })
    })
  }
}
