import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'

import LoginForm from '../forms/Login'

import routes from '../constants/routes'
import styles from '../constants/styles'

class Login extends Component {

  render() {
    const subtitle = this.props.invite.email && <FormattedMessage id="login_to_join" values={{inviter: this.props.invite.inviter, tribe: this.props.invite.tribe}} />

    return (
      <Card className="main">
        <CardTitle subtitle={subtitle} />
        <LoginForm email={this.props.invite.email} destination={this.props.destination} />
      </Card>
    )
  }

}

Login.propTypes = {
  destination: PropTypes.string,
  invite: PropTypes.object.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.data,
  error: state.login.error,
})

export default connect(mapStateToProps)(Login)
