import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { reduxForm } from 'redux-form'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'

import login from '../actions/login'

// export const fields = ['email', 'password']

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    // event.preventDefault()
    this.props.login(this.refs.email.getValue(), this.refs.password.getValue())
  }

  render() {
    const emailError = (this.props.emailError && 'Unknown email address')
    const passwordError = (this.props.passwordError && 'Wrong password')
    const otherError = (this.props.otherError && 'Internal server error: please try again later')

    return (
      <form onSubmit={this.handleSubmit} id="login">
        <Card>
          <CardTitle title="Login" />
          <CardText>
            <TextField ref="email" floatingLabelText="Email" errorText={emailError} />
            <br />
            <TextField ref="password" type="password" floatingLabelText="Password" errorText={passwordError} />
          </CardText>
          <CardActions>
            <RaisedButton label="Login" onTouchTap={this.handleSubmit} />
            <p className="error">{otherError}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Login.propTypes = {
  token: PropTypes.string,
  email: PropTypes.string,
  emailError: PropTypes.bool,
  passwordError: PropTypes.bool,
  otherError: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  token: state.login.token,
  email: state.login.email,
  emailError: state.login.emailError,
  passwordError: state.login.passwordError,
  otherError: state.login.otherError,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
