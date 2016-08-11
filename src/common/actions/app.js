import {db, auth} from '../firebase'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  CLOSE_SNACK,
  UPDATE_LANG,
  REQUEST,
  SUCCESS,
} from '../constants/actions'

import report from './error'

export const toggleMenu = (open) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_MENU,
      open,
    })
  }
}
export const toggleTribes = (open) => {
  return (dispatch) => {
    dispatch({
      type: TOGGLE_TRIBES,
      open,
    })
  }
}

export const resize = () => {
  return (dispatch) => {
    dispatch({
      type: RESIZE,
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }
}

export const closeSnack = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_SNACK,
    })
  }
}

export const updateLang = (lang) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_LANG,
      lang,
    })
  }
}

export const setLastViewedHistoryKey = (key) => {
  return (dispatch) => {
    dispatch({
      type: REQUEST,
    })
    db.ref('tribes/' + auth.currentUser.tid + '/members/' + auth.currentUser.uid + '/last_viewed_history_key').set(key)
    .then(() => {
      dispatch({
        type: SUCCESS,
      })
    })
    .catch((error) => {
      dispatch(report(error, 'setLastViewedHistoryKey'))
    })
  }
}
