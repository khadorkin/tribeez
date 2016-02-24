import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import postLogin from '../actions/postLogin'

import styles from '../styles'

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postLogin(this.refs.email.getValue(), this.refs.password.getValue())
  }

  render() {
    //const { fields: { email, password }, handleSubmit } = this.props

    const subtitle = this.props.invite.email ? <FormattedMessage id="login_to_join" values={{inviter: this.props.invite.inviter, tribe: this.props.invite.tribe}} /> : null

    return (
      <Card className="main">
        <form onSubmit={this.handleSubmit}>
          <CardTitle title={<FormattedMessage id="login" />} subtitle={subtitle} />
          <CardText>
            <TextField style={styles.field}
                       type="email"
                       defaultValue={this.props.invite.email}
                       ref="email"
                       required
                       floatingLabelText="Email"
                       errorText={this.props.error === 'email' && <FormattedMessage id="error.login.email" />}
                       />
            <TextField style={styles.field}
                       type="password"
                       ref="password"
                       required
                       floatingLabelText="Password"
                       errorText={this.props.error === 'password' && <FormattedMessage id="error.login.password" />}
                       />
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Login" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
            <p>No account yet? <Link to="/register">Register now!</Link></p>
          </CardActions>
        </form>
      </Card>
    )
  }

}

Login.propTypes = {
  invite: PropTypes.object.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  invite: state.join.data,
  error: state.login.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postLogin,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
