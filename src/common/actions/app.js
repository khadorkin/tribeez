import {db, auth} from '../firebase'

import {
  TOGGLE_MENU,
  TOGGLE_TRIBES,
  RESIZE,
  CLOSE_SNACK,
  UPDATE_LANG,
  REQUEST,
  SUCCESS,
  ALERT,
  CLOSE_ALERT,
} from '../constants/actions'

import failure from './failure'

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

export const alert = (options) => {
  return (dispatch) => {
    dispatch({
      type: ALERT,
      options,
    })
  }
}

export const closeAlert = () => {
  return (dispatch) => {
    dispatch({
      type: CLOSE_ALERT,
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
      dispatch(failure(error, 'setLastViewedHistoryKey'))
    })
  }
}
