import firebase from 'firebase'

import {
  LOGOUT,
  LOGOUT_FAILURE,
  SNACK_MESSAGE,
} from '../constants/actions'

export default () => {
  return function(dispatch) {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: LOGOUT,
      })
      dispatch({
        type: SNACK_MESSAGE,
        message: 'logout_success',
      })
    }, (error) => {
      dispatch({
        type: LOGOUT_FAILURE,
        error,
      })
    })
  }
}
