import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import CardActions from 'material-ui/lib/card/card-actions'
import FlatButton from 'material-ui/lib/flat-button'
import RaisedButton from 'material-ui/lib/raised-button'

import langs from '../resources/langs'

import styles from '../styles'

import updateInvite from '../actions/updateInvite'
import postInvite from '../actions/postInvite'

class NewMember extends Component {

  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(event) {
    this.props.updateInvite({
      email: event.target.value,
    })
  }

  handleLangChange(event, index, value) {
    this.props.updateInvite({
      lang: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postInvite(this.props.email, this.props.lang)
  }

  render() {
    const langItems = langs.map(item =>
      <MenuItem value={item.code} key={item.code} primaryText={item.name} />
    )

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardText>
            <TextField style={styles.field} type="email" ref="email" value={this.props.email} onChange={this.handleEmailChange} floatingLabelText="Email" required errorText={this.props.error === 'email' && <FormattedMessage id="error.email" />} />
            <SelectField style={styles.field} floatingLabelText="Language" value={this.props.lang} onChange={this.handleLangChange} errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}>
              {langItems}
            </SelectField>
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Invite" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

NewMember.propTypes = {
  email: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  email: state.invite.email,
  lang: state.invite.lang,
  error: state.invite.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateInvite,
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewMember)
