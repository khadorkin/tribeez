import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Details from '../hoc/Details'
import FormattedMessage from '../components/FormattedMessage'
import FormattedNumber from '../components/FormattedNumber'
import Avatar from '../components/Avatar'

import colors from '../../common/constants/colors'

class BillDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.string.isRequired,
  }

  mapper(bill, userMap) {
    return [
      {
        id: 'amount',
        icon: 'local-atm',
        money: bill.amount,
      },
      {
        id: 'description',
        icon: 'description',
        text: bill.description,
      },
      {
        id: 'payer',
        icon: 'person',
        message: 'paid_by',
        values: {user: userMap[bill.payer].name},
      },
      {
        id: 'paid',
        icon: 'schedule',
        message: 'paid_on',
        values: {when: bill.paid},
      },
    ]
  }

  renderBody(bill, userMap) {
    return (
      <View style={styles.body}>
        <FormattedMessage id="parts" style={styles.title} />
        {
          Object.keys(bill.parts).map((id) => {
            const user = userMap[id]

            return (
              <View style={styles.part} key={id}>
                <Avatar user={user} />
                <Text style={styles.name}>{user.name}</Text>
                <FormattedNumber value={bill.parts[id]} format="money" style={styles.amount} />
              </View>
            )
          })
        }
      </View>
    )
  }

  render() {
    return (
      <Details type="bill" id={this.props.id} mapper={this.mapper} renderBody={this.renderBody} />
    )
  }
}

const styles = StyleSheet.create({
  body: {
    margin: 16,
    borderTopWidth: 1,
    borderTopColor: colors.underline,
  },
  title: {
    color: colors.primaryText,
    fontSize: 20,
    marginVertical: 8,
  },
  part: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  name: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 16,
    marginLeft: 24,
  },
  amount: {
    color: colors.bills,
    fontSize: 16,
  },
})

export default BillDetails
