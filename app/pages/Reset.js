import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'

import getReset from '../actions/getReset'
import postReset from '../actions/postReset'

import styles from '../constants/styles'

class Reset extends Component {

  constructor(props) {
    super(props)
    this.state = {
      error: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.props.getReset(this.props.params.token)
  }

  componentDidUpdate() {
    const error = this.props.error || this.state.error
    if (['password', 'password_confirmation'].indexOf(error) >= 0) {
      ReactDOM.findDOMNode(this.refs[error].refs.input).focus()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.refs.password.getValue() !== this.refs.password_confirmation.getValue()) {
      this.setState({
        error: 'password_confirmation',
      })
    } else {
      this.setState({
        error: null,
      })
      this.props.postReset(this.props.params.token, this.refs.password.getValue())
    }
  }

  render() {
    return (
      <Card className="main">
        <form onSubmit={this.handleSubmit}>
          <CardTitle subtitle={this.props.name && `${this.props.name}, please choose a new password`} />
          <CardText>
            <TextField ref="password"
              style={styles.field}
              type="password"
              floatingLabelText="Password"
              required={true}
              errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />}
            />
            <TextField ref="password_confirmation"
              style={styles.field}
              type="password"
              floatingLabelText="Password (confirmation)"
              required={true}
              errorText={this.state.error === 'password_confirmation' && <FormattedMessage id="error.password_confirmation" />}
            />
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Change my password" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </form>
      </Card>
    )
  }

}

Reset.propTypes = {
  error: PropTypes.string,
  name: PropTypes.string,
  getReset: PropTypes.func.isRequired,
  postReset: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired, // from react-router
}

const mapStateToProps = (state) => ({
  name: state.reset.name,
  error: state.reset.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getReset,
  postReset,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Reset)
