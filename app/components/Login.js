import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'

import login from '../actions/login'

class Login extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.refs.email.getValue(), this.refs.password.getValue())
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title="Login" />
          <CardText>
            <TextField ref="email" floatingLabelText="Email" errorText={this.props.error === 'email' && <FormattedMessage id="error.login.email" />} />
            <br />
            <TextField ref="password" type="password" floatingLabelText="Password" errorText={this.props.error === 'password' && <FormattedMessage id="error.login.password" />} />
          </CardText>
          <CardActions>
            <RaisedButton label="Login" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Login.propTypes = {
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  error: state.login.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  login,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Login)
