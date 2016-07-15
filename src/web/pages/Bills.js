import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import {Tabs, Tab} from 'material-ui/Tabs'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AsyncContent from '../hoc/AsyncContent'

import Bill from '../components/Bill'
import Balance from '../components/Balance'

import styles from '../styles'
import routes from '../routes'

import deleteItem from '../../common/actions/deleteItem'

class Bills extends Component {
  static propTypes = {
    // redux state:
    users: PropTypes.array.isRequired,
    // action creators:
    deleteItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      bill: {},
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.renderBill = this.renderBill.bind(this)
  }

  handleDialogOpen(bill) {
    this.setState({
      openDialog: true,
      bill,
    })
  }

  handleDelete() {
    this.props.deleteItem('bill', this.state.bill.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  renderBill(row) {
    return <Bill bill={row} key={row.id} onDelete={this.handleDialogOpen} />
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

    //TODO: order by paid DESC
    return (
      <Tabs>
        <Tab label={<FormattedMessage id="tab.bills" />}>
          <AsyncContent name="bills" renderRow={this.renderBill}>
            <Dialog title={this.state.bill.name}
              actions={dialogActions}
              open={this.state.openDialog}
              onRequestClose={this.handleDialogClose}
            >
              <FormattedMessage id="delete_dialog" values={{type: 'bill'}} />
            </Dialog>
          </AsyncContent>

          <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.BILLS_NEW} />}>
            <ContentAdd />
          </FloatingActionButton>
        </Tab>
        <Tab label={<FormattedMessage id="tab.balances" />}>
          {
            this.props.users.map((user) =>
              <Balance user={user} key={user.uid} />
            )
          }
        </Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.tribe.users,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  deleteItem,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
