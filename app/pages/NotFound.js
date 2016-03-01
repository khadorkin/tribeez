import React, {Component} from 'react'
import {Link} from 'react-router'

import routes from '../constants/routes'

import Error from '../components/Error'

class NotFound extends Component {

  render() {
    return <Error message="Page not found" label="Return to activity" containerElement={<Link to={routes.ACTIVITY} />} />
  }

}

export default NotFound
