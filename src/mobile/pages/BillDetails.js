import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Details from '../hoc/Details'
import FormattedNumber from '../components/FormattedNumber'
import FormattedDate from '../components/FormattedDate'
import Log from '../components/Log'

import getItem from '../../common/actions/getBill'
import routes from '../../common/routes'

class BillDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    item: PropTypes.object,
    userMap: PropTypes.object.isRequired,
    // action creators:
    getItem: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem(bill) {
    const {userMap} = this.props

    const payer = userMap[bill.payer_id]

    //TODO: UI

    return (
      <ScrollView>
        <FormattedNumber value={bill.amount} style={styles.info} format="money" />
        <FormattedDate value={bill.paid} style={styles.info} />
        <Text style={styles.info}>Paid by {payer.name}</Text>
        <Text style={styles.info}>{bill.description}</Text>
        {
          bill.parts.map((part) => {
            const part_user = userMap[part.user_id]
            const part_amount = <FormattedNumber value={part.amount} format="money" />

            return (
              <Text style={styles.info} key={part.user_id}>
                {part_user.name}: {part_amount}
              </Text>
            )
          })
        }
        <Log type="bill" id={bill.id} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details
        {...this.props}
        render={this.renderItem}
        editRoute={routes.BILLS_EDIT}
      />
    )
  }
}

const styles = StyleSheet.create({
  info: {
    margin: 10,
  },
})

const mapStateToProps = (state, ownProps) => ({
  // for <Details> HoC:
  item: state.bills.items.find((i) => i.id === ownProps.id)
     || state.item.bill,
  loading: state.bills.loading,
  error: state.bills.error,
  // for this component:
  userMap: state.tribe.userMap,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getItem,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
