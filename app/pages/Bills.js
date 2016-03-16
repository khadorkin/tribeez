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
    if (!this.props.bills.length) {
      this.props.getBills()
    }
  }

  handleRetry() {
    this.props.getBills()
  }

  render() {
    const prefix = this.props.balance > 0 ? '+' : ''

    return (
      <div>
        {
          this.props.balance !== undefined &&
            <div style={{backgroundColor: colors.cyan500, padding: '5px', textAlign: 'center'}}>
              <h2 style={{fontWeight: 400, color: 'white', fontSize: '2em'}}>
                {prefix}<FormattedNumber value={this.props.balance} style="currency" currency={this.props.currency} />
              </h2>
            </div>
        }

        {
          this.props.bills.map((bill) =>
            <Bill bill={bill} key={bill.id} />
          )
        }

        {
          this.props.error && <Error message={this.props.error} onRetry={this.handleRetry} />
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
  bills: PropTypes.array,
  error: PropTypes.string,
  getBills: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  balance: state.member.user.balance,
  currency: state.member.tribe.currency,
  bills: state.bills.list,
  error: state.bills.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBills,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bills)
