import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedNumber} from 'react-intl'
import {Link} from 'react-router'

import FloatingActionButton from 'material-ui/lib/floating-action-button'
import ContentAdd from 'material-ui/lib/svg-icons/content/add'

import Bill from '../components/Bill'
import Error from '../components/Error'

import styles from '../constants/styles'
import routes from '../constants/routes'

import getBills from '../actions/getBills'

import * as colors from 'material-ui/lib/styles/colors'

class Bills extends Component {

  constructor(props) {
    super(props)
    this.handleRetry = this.handleRetry.bind(this)
  }

  componentWillMount() {
    if (!this.props.bills.got) {
      this.props.getBills()
    }
  }

  handleRetry() {
    this.props.getBills()
  }

  render() {
    const {bills, balance, currency} = this.props

    const prefix = balance > 0 ? '+' : ''

    return (
      <div>
        {
          balance !== undefined &&
            <div style={{backgroundColor: colors.cyan500, padding: '5px', textAlign: 'center'}}>
              <h2 style={{fontWeight: 400, color: 'white', fontSize: '2em'}}>
                {prefix}<FormattedNumber value={balance} style="currency" currency={currency} />
              </h2>
            </div>
        }

        {
          bills.list.map((bill) =>
            <Bill bill={bill} key={bill.id} />
          )
        }

        {
          bills.error && <Error message={bills.error} onRetry={this.handleRetry} />
        }

        <FloatingActionButton style={styles.fab} containerElement={<Link to={routes.BILLS_NEW} />}>
          <ContentAdd />
        </FloatingActionButton>
      </div>
    )
  }

}

Bills.propTypes = {
  balance: PropTypes.number,
  currency: PropTypes.string,
  bills: PropTypes.object.isRequired,
  getBills: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  balance: state.member.user.balance,
  currency: state.member.tribe.currency,
  bills: state.bills,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBills,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
