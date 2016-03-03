import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedDate} from 'react-intl'
import {Link} from 'react-router'

import Paper from 'material-ui/lib/paper'
import List from 'material-ui/lib/lists/list'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import IconButton from 'material-ui/lib/icon-button'
import RefreshIcon from 'material-ui/lib/svg-icons/navigation/refresh'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import Snackbar from 'material-ui/lib/snackbar'

import Member from '../components/Member'
import Error from '../components/Error'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getInvites from '../actions/getInvites'
import updateInvite from '../actions/updateInvite'
import postInvite from '../actions/postInvite'

class Members extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      invite: {},
    }
    this.handleSnackClose = this.handleSnackClose.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.handleResend = this.handleResend.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  componentWillMount() {
    this.props.getInvites()
  }

  openDialog(invite) {
    this.setState({
      openDialog: true,
      invite,
    })
  }

  handleResend() {
    this.props.postInvite(this.state.invite.email, this.state.invite.lang)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  handleSnackClose() {
    this.props.updateInvite({
      snack: false,
    })
  }

  handleRetry() {
    this.props.getInvites()
  }

  render() {
    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Send"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleResend}
      />,
    ]

    return (
      <div style={{padding: '10px'}}>
        {
          this.props.users.map((user) =>
            <Member user={user} key={user.id} />
          )
        }

        {
          this.props.invites.length > 0 &&
            <Paper>
              <List subheader="Invites send">
                {
                  this.props.invites.map((invite, index, arr) => {
                    const refreshButton = <IconButton onTouchTap={this.openDialog.bind(this, invite)}><RefreshIcon /></IconButton>
                    const inviter = this.props.users.find((user) => user.id === invite.inviter_id)
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

              <Dialog title="Re-invite"
                actions={dialogActions}
                modal={false}
                open={this.state.openDialog}
                onRequestClose={this.handleDialogClose}
              >
                Resend invite to {this.state.invite.email}?
              </Dialog>
            </Paper>
        }

        {
          this.props.error && <Error message={this.props.error} onRetry={this.handleRetry} />
        }

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.MEMBERS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>

        <Snackbar
          open={this.props.snack}
          message={this.props.sendError ? 'Error: please try again' : 'Invite sent!'}
          onRequestClose={this.handleSnackClose}
          autoHideDuration={5000}
        />
      </div>
    )
  }

}

Members.propTypes = {
  users: PropTypes.array,
  invites: PropTypes.array,
  error: PropTypes.string,
  sendError: PropTypes.string,
  snack: PropTypes.bool.isRequired,
  getInvites: PropTypes.func.isRequired,
  updateInvite: PropTypes.func.isRequired,
  postInvite: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  invites: state.invites.list,
  error: state.invites.error,
  sendError: state.invite.error,
  snack: state.invite.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvites,
  updateInvite,
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
