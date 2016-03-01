import {REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, initialState)
    case REGISTER_FAILURE:
      return Object.assign({}, initialState, {
        error: ['city_name', 'country_code', 'place_id'].indexOf(action.error) >= 0 ? 'city' : action.error,
      })
    default:
      return state
  }
}
