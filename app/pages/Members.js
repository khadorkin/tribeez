import React from 'react'
const PropTypes = React.PropTypes
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedDate} from 'react-intl'
import {Link} from 'react-router'

import Paper from 'material-ui/lib/paper'
import List from 'material-ui/lib/lists/list'
import Subheader from 'material-ui/lib/Subheader'
import ListItem from 'material-ui/lib/lists/list-item'
import Divider from 'material-ui/lib/divider'
import IconButton from 'material-ui/lib/icon-button'
import RefreshIcon from 'material-ui/lib/svg-icons/navigation/refresh'
import Dialog from 'material-ui/lib/dialog'
import FlatButton from 'material-ui/lib/flat-button'
import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import AsyncContent from '../hoc/AsyncContent'

import Member from '../components/Member'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getInvites from '../actions/getInvites'
import postInvite from '../actions/postInvite'

class Members extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      invite: {},
    }
    this.handleLoad = this.handleLoad.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.handleResend = this.handleResend.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleLoad() {
    if (!this.props.invites.got) {
      this.props.getInvites()
    }
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
      <AsyncContent style={{padding: '10px'}} onLoad={this.handleLoad} error={invites.error}>
        {
          users.map((user) =>
            <Member user={user} key={user.id} />
          )
        }

        {
          invites.list.length > 0 &&
            <Paper>
              <List>
                <Subheader>Invites send</Subheader>
                {
                  invites.list.map((invite, index, arr) => {
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

              <Dialog title="Re-invite"
                actions={dialogActions}
                open={this.state.openDialog}
                onRequestClose={this.handleDialogClose}
              >
                Resend invite to {this.state.invite.email}?
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
  users: PropTypes.array,
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
