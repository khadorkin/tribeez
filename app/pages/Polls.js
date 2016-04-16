import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Link} from 'react-router'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AsyncContent from '../hoc/AsyncContent'

import Poll from '../components/Poll'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getPolls from '../actions/getPolls'
import deletePoll from '../actions/deletePoll'

class Polls extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      poll: {},
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleDialogOpen(poll) {
    this.setState({
      openDialog: true,
      poll,
    })
  }

  handleDelete() {
    this.props.deletePoll(this.state.poll.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const {polls} = this.props

    const dialogActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onTouchTap={this.handleDelete}
      />,
    ]

    return (
      <AsyncContent fetcher={this.props.getPolls} data={polls}>
        {
          polls.items.map((poll) =>
            <Poll poll={poll} key={poll.id} onDelete={this.handleDialogOpen} />
          )
        }

        <Dialog title="Delete poll"
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}
        >
          Delete the poll named "{this.state.poll.name}"?
        </Dialog>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.POLLS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Polls.propTypes = {
  // redux state:
  polls: PropTypes.object.isRequired,
  // action creators:
  getPolls: PropTypes.func.isRequired,
  deletePoll: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  polls: state.polls,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPolls,
  deletePoll,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Polls)
