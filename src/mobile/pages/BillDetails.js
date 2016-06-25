import React, {Component, PropTypes} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Fab from '../components/Fab'
import FormattedNumber from '../components/FormattedNumber'
import FormattedDate from '../components/FormattedDate'
import Log from '../components/Log'

import getBill from '../../common/actions/getBill'
import routes from '../../common/routes'
import router from '../../common/router'

class BillDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    bill: PropTypes.object,
    users: PropTypes.array.isRequired,
    currency: PropTypes.string.isRequired,
    // action creators:
    getBill: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleFab = this.handleFab.bind(this)
  }

  componentDidMount() {
    if (!this.props.bill || this.props.bill.id !== this.props.id) {
      this.props.getBill(this.props.id)
    }
  }

  handleFab() {
    const route = routes.BILLS_EDIT
    route.edit = this.props.bill
    router.push(routes.BILLS_EDIT)
  }

  render() {
    const {bill, users, currency} = this.props

    if (!bill) {
      return null // loading
    }

    const payer = users.find((u) => u.id === bill.payer_id)

    //TODO: UI

    return (
      <View style={styles.container}>
        <ScrollView>
          <FormattedNumber value={bill.amount} style={styles.info} options={{style: 'currency', currency}} />
          <FormattedDate value={bill.paid} style={styles.info} />
          <Text style={styles.info}>Paid by {payer.name}</Text>
          <Text style={styles.info}>{bill.description}</Text>
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
          <Log type="bill" id={bill.id} />
        </ScrollView>
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
  bill: state.bills.items.find((i) => i.id === ownProps.id)
     || state.bills.current,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBill,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillDetails)
