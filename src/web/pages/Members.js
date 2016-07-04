import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedRelative} from 'react-intl'
import {Link} from 'react-router'

import {Tabs, Tab} from 'material-ui/Tabs'
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

import styles from '../styles'
import routes from '../routes'

import getInvites from '../../common/actions/getInvites'
import postInvite from '../../common/actions/postInvite'

class Members extends Component {
  static propTypes = {
    // redux state:
    uid: PropTypes.string,
    users: PropTypes.array.isRequired,
    userMap: PropTypes.object.isRequired,
    invites: PropTypes.object.isRequired,
    // action creators:
    getInvites: PropTypes.func.isRequired,
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

  render() {
    const {invites, users, userMap} = this.props

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
              users.map((user) =>
                <Member user={user} key={user.id} />
              )
            }
          </Tab>
          <Tab label={<FormattedMessage id="tab.invited" />}>
            <AsyncContent fetcher={this.props.getInvites} data={invites}>
              {
                invites.items.length > 0 &&
                  <Paper style={{margin: '15px 10px'}}>
                    <List>
                      <Subheader>Invites send</Subheader>
                      {
                        invites.items.map((invite, index, arr) => {
                          const refreshButton = <IconButton onTouchTap={this.openDialog.bind(this, invite)}><RefreshIcon /></IconButton>
                          const inviter = userMap[invite.inviter_id]
                          if (!inviter) {
                            return null
                          }
                          const when = <FormattedRelative value={invite.invited} />
                          const details = <div><FormattedMessage id="invited_by" values={{user: inviter.name, when}} /></div>
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
                      <FormattedMessage id="dialog_reinvite" />
                    </Dialog>
                  </Paper>
              }
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
  uid: state.member.user.id,
  users: state.member.tribe.users,
  userMap: state.member.tribe.userMap,
  invites: state.invites,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getInvites,
  postInvite,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Members)
