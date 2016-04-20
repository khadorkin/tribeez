import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedNumber, FormattedMessage} from 'react-intl'
import {Link} from 'react-router'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import AsyncContent from '../hoc/AsyncContent'

import Bill from '../components/Bill'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getBills from '../actions/getBills'
import deleteBill from '../actions/deleteBill'

import * as colors from 'material-ui/styles/colors'

class Bills extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openDialog: false,
      bill: {},
    }
    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
  }

  handleDialogOpen(bill) {
    this.setState({
      openDialog: true,
      bill,
    })
  }

  handleDelete() {
    this.props.deleteBill(this.state.bill.id)
    this.handleDialogClose()
  }

  handleDialogClose() {
    this.setState({
      openDialog: false,
    })
  }

  render() {
    const {bills, balance, currency} = this.props

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

    const prefix = balance > 0 ? '+' : ''

    return (
      <AsyncContent fetcher={this.props.getBills} data={bills}>
        {
          balance !== undefined &&
            <div style={{backgroundColor: colors.cyan500, padding: '5px', textAlign: 'center'}}>
              <h2 style={{fontWeight: 400, color: 'white', fontSize: '2em'}}>
                {prefix}<FormattedNumber value={balance} style="currency" currency={currency} />
              </h2>
            </div>
        }

        {
          bills.items.map((bill) =>
            <Bill bill={bill} key={bill.id} onDelete={this.handleDialogOpen} />
          )
        }

        <Dialog title={this.state.bill.name}
          actions={dialogActions}
          open={this.state.openDialog}
          onRequestClose={this.handleDialogClose}
        >
          <FormattedMessage id="delete_dialog" values={{type: 'bill'}} />
        </Dialog>

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.BILLS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </AsyncContent>
    )
  }

}

Bills.propTypes = {
  // redux state:
  balance: PropTypes.number,
  currency: PropTypes.string,
  bills: PropTypes.object.isRequired,
  // action creators:
  getBills: PropTypes.func.isRequired,
  deleteBill: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  balance: state.member.user.balance,
  currency: state.member.tribe.currency,
  bills: state.bills,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBills,
  deleteBill,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
