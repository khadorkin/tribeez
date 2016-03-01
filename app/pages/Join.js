import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import langs from '../resources/langs'

import getInvite from '../actions/getInvite'
import updateJoin from '../actions/updateJoin'
import updateLang from '../actions/updateLang'
import postJoin from '../actions/postJoin'

import styles from '../constants/styles'

class Register extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  componentWillMount() {
    this.props.getInvite(this.props.params.token)
  }

  componentDidUpdate() {
    if (this.props.error && this.props.error !== 'other') {
      const ref = this.props.error.indexOf('email') === 0 ? 'email' : this.props.error
      ReactDOM.findDOMNode(this.refs[ref].refs.input).focus()
    }
  }

  handleEmailChange(event) {
    this.props.updateJoin({ email: event.target.value })
  }

  handleLangChange(event, index, value) {
    this.props.updateLang(value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postJoin({
      token: this.props.params.token,
      name: this.refs.name.getValue(),
      email: this.props.email,
      password: this.refs.password.getValue(),
      lang: this.props.lang,
    })
  }

  render() {
    const langItems = langs.map(item =>
      <MenuItem value={item.code} key={item.code} primaryText={item.name} />
    )

    return (
      <Card className="main">
        <form onSubmit={this.handleSubmit}>
          <CardTitle title={this.props.tribe} subtitle={<FormattedMessage id="invited_you" values={{name: this.props.inviter}} />} />
          <CardText>
            <TextField ref="name"
              style={styles.field}
              floatingLabelText="Your name"
              required={true}
              errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />}
            />
            <TextField ref="email"
              style={styles.field}
              type="email"
              floatingLabelText="Email"
              value={this.props.email}
              onChange={this.handleEmailChange}
              required={true}
              errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={`error.${this.props.error}`} />}
            />
            <TextField ref="password"
              style={styles.field}
              type="password"
              floatingLabelText="Password"
              required={true}
              errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />}
            />
            <SelectField ref="lang"
              style={styles.field}
              floatingLabelText="Language"
              value={this.props.lang}
              onChange={this.handleLangChange}
              errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}
            >
              {langItems}
            </SelectField>
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Register & join this tribe" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </form>
      </Card>
    )
  }

}

Register.propTypes = {
  email: PropTypes.string,
  lang: PropTypes.string,
  inviter: PropTypes.string,
  tribe: PropTypes.string,
  error: PropTypes.string,
  getInvite: PropTypes.func.isRequired,
  updateLang: PropTypes.func.isRequired,
  updateJoin: PropTypes.func.isRequired,
  postJoin: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired, // from react-router
}

const mapStateToProps = (state) => ({
  email: state.join.data.email,
  lang: state.app.lang,
  inviter: state.join.data.inviter,
  tribe: state.join.data.tribe,
  error: state.join.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
  updateLang,
  updateJoin,
  postJoin,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
