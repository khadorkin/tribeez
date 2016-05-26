import React, {Component} from 'react'
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'

import RaisedButton from 'material-ui/RaisedButton'

import routes from '../routes'

class NotFound extends Component {

  render() {
    return (
      <div style={{textAlign: 'center', padding: '40px 0'}}>
        <div style={{marginBottom: 20, color: 'red'}}>
          <FormattedMessage id="not_found" />
        </div>
        <RaisedButton label={<FormattedMessage id="return_home" />} containerElement={<Link to={routes.ACTIVITY} />} />
      </div>
    )
  }

}

export default NotFound
