import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Fab from '../components/Fab'
import FormattedNumber from '../components/FormattedNumber'
import FormattedDate from '../components/FormattedDate'

import routes from '../../common/routes'
import router from '../../common/router'

class BillDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    bill: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  handleFab() {
    const route = routes.BILLS_EDIT
    route.edit = this.props.bill
    router.push(routes.BILLS_EDIT)
  }

  render() {
    const {bill, users, currency} = this.props

    const payer = users.find((u) => u.id === bill.payer_id)

    //TODO: UI

    return (
      <View style={styles.container}>
        <FormattedNumber value={bill.amount} style={styles.info} options={{style: 'currency', currency}} />
        <FormattedDate value={bill.paid} style={styles.info} />
        <Text style={styles.info}>Paid by {payer.name}</Text>
        {
          bill.parts.map((part) => {
            const part_user = users.find((u) => u.id === part.user_id)
            const part_amount = <FormattedNumber value={part.amount} options={{style: 'currency', currency}} />

            return (
              <Text style={styles.info} key={part.user_id}>
                {part_user.name}: {part_amount}
              </Text>
            )
          })
        }
        <Fab name="edit" onPress={this.handleFab} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4,
    backgroundColor: 'white',
    flex: 1,
  },
  info: {
    margin: 10,
  },
})

const mapStateToProps = (state, ownProps) => ({
  bill: state.bills.items.find((i) => i.id === ownProps.id),
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

export default connect(mapStateToProps)(BillDetails)
