import React, {Component, PropTypes} from 'react'
import {ScrollView, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Details from '../hoc/Details'
import FormattedNumber from '../components/FormattedNumber'
import FormattedDate from '../components/FormattedDate'
import Log from '../components/Log'

import routes from '../../common/routes'

class BillDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
    // from redux:
    bill: PropTypes.object,
    userMap: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this)
  }

  renderItem() {
    const {bill, userMap} = this.props

    const payer = userMap[bill.payer]

    //TODO: UI

    return (
      <ScrollView>
        <FormattedNumber value={bill.amount} style={styles.info} format="money" />
        <FormattedDate value={bill.paid} style={styles.info} />
        <Text style={styles.info}>Paid by {payer.name}</Text>
        <Text style={styles.info}>{bill.description}</Text>
        {
          Object.keys(bill.parts).map((uid) => {
            const part_user = userMap[uid]
            const part_amount = <FormattedNumber value={bill.parts[uid]} format="money" />

            return (
              <Text style={styles.info} key={uid}>
                {part_user.name}: {part_amount}
              </Text>
            )
          })
        }
        <Log item={bill} />
      </ScrollView>
    )
  }

  render() {
    return (
      <Details type="bill"
        id={this.props.id}
        item={this.props.bill}
        editRoute={routes.BILLS_EDIT}
      >
        {this.props.bill && this.renderItem()}
      </Details>
    )
  }
}

const styles = StyleSheet.create({
  info: {
    margin: 10,
  },
})

const mapStateToProps = (state) => ({
  // for <Details> HoC:
  bill: state.item.bill,
  // for this component:
  userMap: state.tribe.userMap,
})

export default connect(mapStateToProps)(BillDetails)
