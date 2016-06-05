import React, {Component, PropTypes} from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native'

import {connect} from 'react-redux'

import FormattedMessage from './FormattedMessage'
import FormattedNumber from './FormattedNumber'
import FormattedRelative from './FormattedRelative'

import routes from '../../common/routes'
import router from '../../common/router'
import colors from '../../common/constants/colors'
import gravatar from '../../common/utils/gravatar'

class Bill extends Component {
  static propTypes = {
    // from redux:
    uid: PropTypes.number,
    users: PropTypes.array.isRequired,
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
    route.item = this.props.bill
    router.push(route)
  }

  render() {
    const {bill, users, currency} = this.props

    const payer = users.find((u) => u.id === bill.payer_id)
    if (!payer) {
      return null
    }

    const user_part = bill.parts.find((p) => p.user_id === this.props.uid)

    const total = <FormattedNumber value={bill.amount} options={{style: 'currency', currency}} />

    let formatted_part
    if (user_part) {
      formatted_part = <FormattedMessage id="bill.mypart" values={{amount: user_part.amount}} />
    } else {
      formatted_part = <FormattedMessage id="bill.nopart" />
    }
    const date = <FormattedRelative value={bill.added} />

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handlePress} style={styles.main}>
          <Image
            source={{uri: gravatar(payer, 80)}}
            style={styles.avatar}
          />
          <View style={styles.titles}>
            <Text style={styles.title}>{total} — {bill.name}</Text>
            <Text style={styles.subtitle}>{date} — {formatted_part}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  uid: state.member.user.id,
  users: state.member.tribe.users,
  currency: state.member.tribe.currency,
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 5,
    elevation: 1,
  },
  main: {
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  titles: {
    flex: 1,
  },
  title: {
    color: colors.primaryText,
  },
  subtitle: {
    color: colors.secondaryText,
  },
})

export default connect(mapStateToProps)(Bill)
