import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
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
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

import postPassword from '../actions/postPassword'

import styles from '../constants/styles'
import routes from '../constants/routes'

class Password extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    if (this.props.error) {
      ReactDOM.findDOMNode(this.refs[this.props.error].refs.input).focus()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postPassword(this.refs.email.getValue(), this.props.lang)
  }

  render() {
    return (
      <Card className="main">
        <form onSubmit={this.handleSubmit}>
          <CardTitle subtitle="Fill this form to receive a reset link via email" />
          <CardText>
            <TextField ref="email"
              style={styles.field}
              type="email"
              required={true}
              floatingLabelText="Email"
              errorText={this.props.error === 'email' && <FormattedMessage id="error.login.email" />}
            />
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Send request" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </form>

        <Dialog
          actions={[<FlatButton label="OK" primary={true} containerElement={<Link to={routes.WELCOME} />} style={{textAlign: 'center'}} />]}
          modal={false}
          open={this.props.sent}
        >
          A reset link has been sent to your email address.<br />
          Click on that link to reset your password.
        </Dialog>
      </Card>
    )
  }

}

Password.propTypes = {
  error: PropTypes.string,
  sent: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired,
  postPassword: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  error: state.password.error,
  sent: state.password.sent,
  lang: state.app.lang,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postPassword,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Password)
