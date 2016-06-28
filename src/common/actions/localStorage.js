import {
    LOCAL_STORAGE,
} from '../constants/actions'

export const getLocal = (key) => {
  return function(dispatch) {
    dispatch({
      type: LOCAL_STORAGE,
      key,
      value: localStorage.getItem('mytribe.' + key),
    })
  }
}

export const setLocal = (key, value) => {
  return function(dispatch) {
    localStorage.setItem('mytribe.' + key, value)
    dispatch({
      type: LOCAL_STORAGE,
      key,
      value,
    })
  }
}

export const removeLocal = (key) => {
  return function(dispatch) {
    localStorage.removeItem('mytribe.' + key)
    dispatch({
      type: LOCAL_STORAGE,
      key,
      value: null,
    })
  }
}
