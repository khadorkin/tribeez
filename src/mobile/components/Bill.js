import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../components/ListItem'
import FormattedMessage from './FormattedMessage'
import FormattedNumber from './FormattedNumber'
import FormattedRelative from './FormattedRelative'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'

class Bill extends Component {
  static propTypes = {
    // from redux:
    uid: PropTypes.string,
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string,
    // from parent:
    bill: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    const route = routes.BILL
    route.props = {
      id: this.props.bill.id,
    }
    route.title = this.props.bill.name
    router.push(route)
  }

  render() {
    const {bill, userMap, currency} = this.props

    const payer = userMap[bill.payer]
    if (!payer) {
      return null
    }

    const user_part = bill.parts[this.props.uid]

    const total = <FormattedNumber value={bill.amount} options={{style: 'currency', currency}} />

    const date = <FormattedRelative value={bill.added} />

    let rightLabel
    if (user_part) {
      rightLabel = <FormattedNumber value={user_part} format="money" style={styles.part} />
    }

    return (
      <ListItem user={payer} onPress={this.handlePress} rightLabel={rightLabel}>
        <Text style={styles.title}>{bill.name}</Text>
        <Text style={styles.subtitle}>{total}</Text>
        <Text style={styles.subtitle}>{date}</Text>
      </ListItem>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.user.uid,
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
})

const styles = StyleSheet.create({
  title: {
    color: colors.bills,
    fontSize: 16,
    //marginBottom: 8,
  },
  subtitle: {
    color: colors.secondaryText,
    fontStyle: 'italic',
  },
  part: {
    fontStyle: 'italic',
    color: colors.secondaryText,
    marginLeft: 16,
    marginTop: 2, // to compensate the +2 fontSize of title
  },
})

export default connect(mapStateToProps)(Bill)
