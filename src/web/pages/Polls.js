import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AsyncContent from '../hoc/AsyncContent'

import Poll from '../components/Poll'
import Link from '../components/Link'

import styles from '../styles'
import routes from '../routes'

import deleteItem from '../../common/actions/deleteItem'

class Polls extends Component {
  static propTypes = {
    // action creators:
    deleteItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      poll: {},
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.renderPoll = this.renderPoll.bind(this)
  }

  handleDialogOpen(poll) {
    this.setState({
      openDialog: true,
      poll,
    })
  }

  handleDelete() {
    this.props.deleteItem('poll', this.state.poll.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  renderPoll(row) {
    return <Poll poll={row} key={row.id} onDelete={this.handleDialogOpen} />
  }

  render() {
    const dialogActions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label={<FormattedMessage id="delete" />}
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ]

    return (
      <div>
        <AsyncContent name="polls" renderRow={this.renderPoll}>
          <Dialog title={this.state.poll.name}
            actions={dialogActions}
            open={this.state.openDialog}
            onRequestClose={this.handleDialogClose}
          >
            <FormattedMessage id="delete_dialog" values={{type: 'poll'}} />
          </Dialog>
        </AsyncContent>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.POLLS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteItem,
}, dispatch)

export default connect(null, mapDispatchToProps)(Polls)
