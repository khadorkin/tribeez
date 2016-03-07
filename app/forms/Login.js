import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'
import {Link} from 'react-router'

import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'

import styles from '../constants/styles'
import routes from '../constants/routes'

import postLogin from '../actions/postLogin'

class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(postLogin.bind(null, this.props.destination))(event)
      .catch((errors) => {
        const field = Object.keys(errors)[0]
        if (field && field !== '_error') {
          ReactDOM.findDOMNode(this.refs[field].refs.input).focus()
        }
      })
  }

  render() {
    const {fields: {email, password}, error, submitting} = this.props
    const subtitle = this.props.invite.email && <FormattedMessage id="login_to_join" values={{inviter: this.props.invite.inviter, tribe: this.props.invite.tribe}} />

    return (
      <form onSubmit={this.handleSubmit}>
        <CardTitle subtitle={subtitle} />
        <CardText>
          <TextField ref="email"
            type="email"
            required={true}
            floatingLabelText="Email"
            errorText={email.touched && email.error && <FormattedMessage id="error.login.email" />}
            {...email}
          />
          <TextField ref="password"
            type="password"
            required={true}
            floatingLabelText="Password"
            errorText={password.touched && password.error && <FormattedMessage id="error.login.password" />}
            {...password}
          />
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label="Login" type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id="error.other" />}
          </p>
          <p style={{marginTop: '2em'}}>
            No account yet? <Link to={routes.REGISTER}>Register now!</Link>
          </p>
        </CardActions>
      </form>
    )
  }
}

LoginForm.propTypes = {
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  destination: PropTypes.string, // next route after login (when trying to directly access a page when anonymous)
  invite: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
}

const mapStateToProps = (state) => ({
  destination: state.login.destination,
  invite: state.join.data,
  initialValues: {email: state.join.data.email}, // email is null when not coming from /join
})

export default reduxForm({
  form: 'login',
  fields: ['email', 'password'],
  returnRejectedSubmitPromise: true,
}, mapStateToProps)(LoginForm)
