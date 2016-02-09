import { routeActions } from 'react-router-redux'

import api from '../api'

import { UPDATE_JOIN_DATA } from '../actions'

export default (data) => {
  return function(dispatch) {
    dispatch({
      type: UPDATE_JOIN_DATA,
      data,
    })
  }
}
