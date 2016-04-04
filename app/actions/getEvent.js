import {push} from 'react-router-redux'

import api from '../utils/api'

import {
  GET_EVENT_REQUEST,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAILURE,
} from '../constants/actions'

import routes from '../constants/routes'

export default (id) => {
  return function(dispatch) {
    dispatch({
      type: GET_EVENT_REQUEST,
    })
    api.get('event', {id})
      .then((response) => {
        if (response.error) {
          dispatch({
            type: GET_EVENT_FAILURE,
          })
        } else {
          dispatch({
            type: GET_EVENT_SUCCESS,
            data: response,
          })
        }
      })
      .catch(() => {
        dispatch({
          type: GET_EVENT_FAILURE,
        })
      })
  }
}
