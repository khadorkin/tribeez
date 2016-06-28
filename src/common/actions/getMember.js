import router from '../router'
import config from '../config'

import api from '../utils/api'

import {
  GET_MEMBER_REQUEST,
  GET_MEMBER_SUCCESS,
  GET_MEMBER_FAILURE,
  LOGIN_DESTINATION,
} from '../constants/actions'

export default (destination, redirectOnLoggedIn, redirectOnAnonymous) => {
  return function(dispatch) {
    dispatch({
      type: GET_MEMBER_REQUEST,
    })
    api.get('member', {version: config.android.versionCode})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_MEMBER_FAILURE,
            error: response.error,
          })
          if (redirectOnAnonymous) {
            router.resetTo(redirectOnAnonymous, dispatch)
            dispatch({
              type: LOGIN_DESTINATION,
              destination,
            })
          }
        } else {
          dispatch({
            type: GET_MEMBER_SUCCESS,
            user: response.user,
            tribe: response.tribe,
          })
          if (redirectOnLoggedIn) {
            router.resetTo(redirectOnLoggedIn, dispatch)
          }
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_MEMBER_FAILURE,
          error: 'request',
          fetchError: err.message,
        })
        //TODO: show an error
        if (redirectOnAnonymous) {
          router.resetTo(redirectOnAnonymous, dispatch)
          dispatch({
            type: LOGIN_DESTINATION,
            destination,
          })
        }
      })
  }
}
