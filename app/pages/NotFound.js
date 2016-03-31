import React, {Component} from 'react'
import {Link} from 'react-router'

import RaisedButton from 'material-ui/lib/raised-button'

import routes from '../constants/routes'

class NotFound extends Component {

  render() {
    return (
      <div style={{textAlign: 'center', padding: '40px 0'}}>
        <div style={{marginBottom: 20, color: 'red'}}>Page not found</div>
        <RaisedButton label="Return to activity" containerElement={<Link to={routes.ACTIVITY} />} />
      </div>
    )
  }

}

export default NotFound
