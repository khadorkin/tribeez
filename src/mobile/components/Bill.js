import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text} from 'react-native'

import {connect} from 'react-redux'

import ListItem from '../hoc/ListItem'
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

    let formatted_part
    if (user_part) {
      formatted_part = <FormattedMessage id="bill.mypart" values={{amount: user_part}} />
    } else {
      formatted_part = <FormattedMessage id="bill.nopart" />
    }
    const date = <FormattedRelative value={bill.added} />

    return (
      <ListItem user={payer} onPress={this.handlePress}>
        <Text style={styles.title}>{total} — {bill.name}</Text>
        <Text style={styles.subtitle}>{date} — {formatted_part}</Text>
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
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Bill)
