import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import {Link} from 'react-router'

import {Tabs, Tab} from 'material-ui/Tabs'
import {ListItem} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

import AsyncContent from '../hoc/AsyncContent'

import Member from '../components/Member'

import styles from '../styles'
import routes from '../routes'

import postInvite from '../../common/actions/postInvite'

class Members extends Component {
  static propTypes = {
    // redux state:
    uid: PropTypes.string,
    users: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired,
    // action creators:
    postInvite: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      invite: {},
    }
    this.openDialog = this.openDialog.bind(this)
    this.handleResend = this.handleResend.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.renderInvite = this.renderInvite.bind(this)
  }

  openDialog(invite) {
    this.setState({
      openDialog: true,
      invite,
    })
  }

  handleResend() {
    this.props.postInvite(this.state.invite.email, this.state.invite.lang, this.props.uid)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  renderInvite(row) {
    //TODO: make Invite component
    const refreshButton = <IconButton onTouchTap={this.openDialog.bind(this, row)}><RefreshIcon /></IconButton>
    const inviter = this.props.userMap[row.inviter_id]
    if (!inviter) {
      return null
    }
    const when = <FormattedRelative value={row.invited} />
    const details = <div><FormattedMessage id="invited_by" values={{user: inviter.name, when}} /></div>
    return (
      <div key={row.key}>
        <ListItem disabled={true} rightIconButton={refreshButton} primaryText={row.email} secondaryText={details} />
        <Divider />
      </div>
    )
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
  uid: state.user.uid,
  users: state.tribe.users,
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
