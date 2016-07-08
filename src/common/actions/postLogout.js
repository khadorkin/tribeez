import firebase from 'firebase'

import {
  FIREBASE_REQUEST,
  LOGOUT,
  FIREBASE_SUCCESS,
  FIREBASE_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default () => {
  return (dispatch) => {
    dispatch({
      type: FIREBASE_REQUEST,
    })
    firebase.auth().signOut().then(() => {
      dispatch({
        type: LOGOUT,
      })
      dispatch({
        type: FIREBASE_SUCCESS,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'logout_success',
      })
    }, (error) => {
      dispatch({
        type: FIREBASE_FAILURE,
        origin: 'postLogout',
        error,
      })
    })
  }
}
