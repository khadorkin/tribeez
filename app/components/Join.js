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
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import langs from '../resources/langs'

import getInvite from '../actions/getInvite'
import updateInvite from '../actions/updateInvite'
import join from '../actions/join'

class Register extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)

    this.props.getInvite(this.props.params.token)
  }

  handleEmailChange(event) {
    this.props.updateInvite({ email: this.refs.email.getValue() })
  }

  handleLangChange(event, index, value) {
    this.props.updateInvite({ lang: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.join({
      token: this.props.params.token,
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      lang: this.props.lang,
    })
  }

  render() {
    const langItems = langs.map((item) => <MenuItem value={item.code} key={item.code} primaryText={item.name} />)

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title={this.props.tribe} subtitle={<FormattedMessage id="invited_by" defaultMessage="{name} invited you" values={{name: this.props.inviter}} />} />
          <CardText>
            <TextField ref="name" floatingLabelText="Your name" required errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />} />
            <br />
            <TextField ref="email" floatingLabelText="Email" value={this.props.email} onChange={this.handleEmailChange} required errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={'error.' + this.props.error} />} />
            <br />
            <TextField ref="password" type="password" floatingLabelText="Password" required errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />} />
            <br />
            <SelectField ref="lang" floatingLabelText="Language" value={this.props.lang} onChange={this.handleLangChange} errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}>
              {langItems}
            </SelectField>
          </CardText>
          <CardActions>
            <RaisedButton label="Register & join this tribe" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Register.propTypes = {
  email: PropTypes.string,
  lang: PropTypes.string,
  inviter: PropTypes.string,
  tribe: PropTypes.string,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  email: state.invite.data.email,
  lang: state.invite.data.lang,
  inviter: state.invite.data.inviter,
  tribe: state.invite.data.tribe,
  error: state.join.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvite,
  updateInvite,
  join,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
