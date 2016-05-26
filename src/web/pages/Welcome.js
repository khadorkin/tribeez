import React, {Component} from 'react'
import {Link} from 'react-router'
import {FormattedMessage} from 'react-intl'

import RaisedButton from 'material-ui/RaisedButton'
import * as colors from 'material-ui/styles/colors'

import Logo from '../../common/images/logo.svg'

import routes from '../routes'

export default class Welcome extends Component {

  render() {
    return (
      <div>
        <div style={{backgroundColor: colors.cyan500, padding: '100px 0 60px', textAlign: 'center'}}>
          <Logo style={{width: '200px', marginBottom: '60px'}} /><br />
          <RaisedButton label={<FormattedMessage id="register" />} containerElement={<Link to={routes.REGISTER} />} />
        </div>
      </div>
    )
  }

}
