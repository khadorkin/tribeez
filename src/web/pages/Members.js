import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import {Tabs, Tab} from 'material-ui/Tabs'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import AsyncContent from '../hoc/AsyncContent'

import Member from '../components/Member'
import Invite from '../components/Invite'
import Link from '../components/Link'

import styles from '../styles'
import routes from '../routes'

import postInvite from '../../common/actions/postInvite'

class Members extends Component {
  static propTypes = {
    // redux state:
    users: PropTypes.array.isRequired,
    // action creators:
    postInvite: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      invite: {},
    }
    this.handleResendDialog = this.handleResendDialog.bind(this)
    this.handleResend = this.handleResend.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.renderInvite = this.renderInvite.bind(this)
  }

  handleResendDialog(invite) {
    this.setState({
      openDialog: true,
      invite,
    })
  }

  handleResend() {
    this.props.postInvite(this.state.invite)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  renderInvite(row) {
    return <Invite invite={row} key={row.id} onResent={this.handleResendDialog} />
  }

  render() {
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
      <div>
        <Tabs>
          <Tab label={<FormattedMessage id="tab.registered" />}>
            {
              this.props.users.map((user) =>
                <Member user={user} key={user.uid} />
              )
            }
          </Tab>
          <Tab label={<FormattedMessage id="tab.invited" />}>
            <AsyncContent name="invites" renderRow={this.renderInvite}>
              <Dialog title={this.state.invite.email}
                actions={dialogActions}
                open={this.state.openDialog}
                onRequestClose={this.handleDialogClose}
              >
                <FormattedMessage id="dialog_reinvite" />
              </Dialog>
            </AsyncContent>
          </Tab>
        </Tabs>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.MEMBERS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
