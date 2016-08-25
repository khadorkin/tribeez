import report from '../report'

import {
  FAILURE,
} from '../constants/actions'

export default (error, origin, type = 'firebase') => {
  return (dispatch) => {
    const errorStr = (error.code || error.message || error.toString()) //TODO: improve

    if (__DEV__) {
      console.error(type + ' error from ' + origin + ':', errorStr, error) // eslint-disable-line no-console
    }

    report.issue(error, type + '::' + origin)

    dispatch({
      type: FAILURE,
      error: errorStr,
    })
  }
}
