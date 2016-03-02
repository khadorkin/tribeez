import {NEW_TRIBE_REQUEST, NEW_TRIBE_SUCCESS, NEW_TRIBE_FAILURE} from '../constants/actions'

const initialState = {
  loading: false,
  error: null,
}

export default (state = initialState, action = null) => {
  switch (action.type) {
    case NEW_TRIBE_REQUEST:
      return Object.assign({}, initialState, {
        loading: true,
      })
    case NEW_TRIBE_SUCCESS:
      return Object.assign({}, initialState)
    case NEW_TRIBE_FAILURE:
      return Object.assign({}, initialState, {
        error: ['city_name', 'country_code', 'place_id'].indexOf(action.error) >= 0 ? 'city' : action.error,
      })
    default:
      return state
  }
}
