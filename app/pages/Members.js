import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routeActions } from 'react-router-redux'
import { FormattedMessage, FormattedDate } from 'react-intl'
import { Link } from 'react-router'

import Table from 'material-ui/lib/table/table'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableHeader from 'material-ui/lib/table/table-header'
import TableRowColumn from 'material-ui/lib/table/table-row-column'
import TableBody from 'material-ui/lib/table/table-body'

import Card from 'material-ui/lib/card/card'
import CardTitle from 'material-ui/lib/card/card-title'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import Snackbar from 'material-ui/lib/snackbar'

import langs from '../resources/langs'

import updateInvite from '../actions/updateInvite'
import postInvite from '../actions/postInvite'

class Members extends Component {

  constructor(props) {
    super(props)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.closeSnack = this.closeSnack.bind(this)
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
    this.props.postInvite(this.refs.email.getValue(), this.props.lang)
  }

  closeSnack() {
    this.props.updateInvite({
      snack: false,
    })
  }

  render() {
    const langItems = langs.map((item) => <MenuItem value={item.code} key={item.code} primaryText={item.name} />)

    return (
      <div>
        <Table multiSelectable={true}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Phone number</TableHeaderColumn>
              <TableHeaderColumn>Birthdate</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              this.props.tribe.users.map(user => (
                <TableRow key={user.id} /*selected={user.current_tribe_id === this.props.tribe.id}*/>
                  <TableRowColumn>{user.name}</TableRowColumn>
                  <TableRowColumn><a href={'mailto:' + user.email}>{user.email}</a></TableRowColumn>
                  <TableRowColumn>{user.phone}</TableRowColumn>
                  <TableRowColumn>{user.birthdate && <FormattedDate value={user.birthdate} day="numeric" month="long" year="numeric" />}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        <Card style={{marginTop:'20px'}}>
          <form onSubmit={this.handleSubmit}>
            <CardTitle title="Add members" />
            <CardText>
              <TextField ref="email" value={this.props.email} onChange={this.handleEmailChange} floatingLabelText="Email" required errorText={this.props.error === 'email' && <FormattedMessage id="error.invite.email" />} />
              <br />
              <SelectField floatingLabelText="Language" value={this.props.lang} onChange={this.handleLangChange} errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}>
                {langItems}
              </SelectField>
            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Send invite" />
            </CardActions>
          </form>
        </Card>
        <Snackbar
          open={this.props.snack}
          message="Invite sent!"
          onRequestClose={this.closeSnack}
        />
      </div>
    )
  }

}

Members.propTypes = {
  tribe: PropTypes.object,
  email: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  tribe: state.user.tribe,
  email: state.invite.email,
  lang: state.invite.lang,
  error: state.invite.error,
  snack: state.invite.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateInvite,
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
