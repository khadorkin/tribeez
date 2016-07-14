import React, {Component} from 'react'
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'

import RaisedButton from 'material-ui/RaisedButton'
import * as colors from 'material-ui/styles/colors'

import routes from '../routes'

class Welcome extends Component {

  render() {
    return (
      <div>
        <div style={{backgroundColor: colors.cyan500, padding: '100px 0 60px', textAlign: 'center'}}>
          <img src="logo.png" style={{marginBottom: '60px', width: 128}} /><br />
          <RaisedButton label={<FormattedMessage id="register" />} containerElement={<Link to={routes.REGISTER} />} />
        </div>
      </div>
    )
  }

}

export default Welcome
