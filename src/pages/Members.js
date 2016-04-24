import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedDate} from 'react-intl'
import {Link} from 'react-router'

import Paper from 'material-ui/Paper'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import AsyncContent from '../hoc/AsyncContent'

import Member from '../components/Member'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getInvites from '../actions/getInvites'
import postInvite from '../actions/postInvite'

class Members extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      invite: {},
    }
    this.openDialog = this.openDialog.bind(this)
    this.handleResend = this.handleResend.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  openDialog(invite) {
    this.setState({
      openDialog: true,
      invite,
    })
  }

  handleResend() {
    this.props.postInvite({
      email: this.state.invite.email,
      lang: this.state.invite.lang,
    })
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const {invites, users} = this.props

    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        secondary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label={<FormattedMessage id="send" />}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleResend}
      />,
    ]

    return (
      <AsyncContent style={{padding: '10px'}} fetcher={this.props.getInvites} data={invites}>
        {
          users.map((user) =>
            <Member user={user} key={user.id} />
          )
        }

        {
          invites.items.length > 0 &&
            <Paper>
              <List>
                <Subheader>Invites send</Subheader>
                {
                  invites.items.map((invite, index, arr) => {
                    const refreshButton = <IconButton onTouchTap={this.openDialog.bind(this, invite)}><RefreshIcon /></IconButton>
                    const inviter = users.find((user) => user.id === invite.inviter_id)
                    if (!inviter) {
                      return null
                    }
                    const date = <FormattedDate value={invite.invited} />
                    const details = <div><FormattedMessage id="invited_by" values={{user: inviter.name, date: date}} /></div>
                    return (
                      <div key={invite.email}>
                        <ListItem disabled={true} rightIconButton={refreshButton} primaryText={invite.email} secondaryText={details} />
                        {index < arr.length - 1 && <Divider />}
                      </div>
                    )
                  })
                }
              </List>

              <Dialog title={this.state.invite.email}
                actions={dialogActions}
                open={this.state.openDialog}
                onRequestClose={this.handleDialogClose}
              >
                <FormattedMessage id="reinvite_dialog" />
              </Dialog>
            </Paper>
        }

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.MEMBERS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Members.propTypes = {
  // redux state:
  users: PropTypes.array.isRequired,
  invites: PropTypes.object.isRequired,
  // action creators:
  getInvites: PropTypes.func.isRequired,
  postInvite: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  invites: state.invites,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvites,
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
