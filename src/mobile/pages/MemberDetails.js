import React, {Component, PropTypes} from 'react'
import {View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet} from 'react-native'

import {connect} from 'react-redux'

import Icon from 'react-native-vector-icons/MaterialIcons'

import FormattedNumber from '../components/FormattedNumber'
import FormattedDate from '../components/FormattedDate'

import colors from '../../common/constants/colors'

const infos = [
  {id: 'email', icon: 'email', href: 'mailto:'},
  {id: 'phone', icon: 'call', href: 'tel:'},
  {id: 'birthdate', icon: 'cake', date: true},
  {id: 'balance', icon: 'account-balance-wallet', money: true},
]

class MemberDetails extends Component {
  static propTypes = {
    // from parent:
    id: PropTypes.number.isRequired,
    // from redux:
    user: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
  }

  handlePress(url) {
    Linking.openURL(url)
  }

  render() {
    const {user} = this.props

    //TODO: UI

    return (
      <View style={styles.container}>
        <ScrollView>
          {
            infos
              .filter((info) => user[info.id])
              .map((info) => {
                let value = user[info.id]
                const href = info.href ? info.href + value : null
                if (info.date) {
                  value = <FormattedDate value={value} options={{day: 'numeric', month: 'long', year: 'numeric'}} /*day="numeric" month="long"*/ />
                }
                if (info.money) {
                  value = <FormattedNumber value={value} options={{style: 'currency', currency: this.props.currency}} />
                }
                if (typeof value === 'string') {
                  value = <Text>{value}</Text>
                }
                return (
                  <TouchableOpacity onPress={href && this.handlePress.bind(this, href)} style={styles.info} key={info.id}>
                    <Icon name={info.icon} color={colors.icon} size={24} style={styles.icon} />
                    {value}
                  </TouchableOpacity>
                )
              })
          }
        </ScrollView>
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
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
})

const mapStateToProps = (state, ownProps) => ({
  user: state.member.tribe.users.find((i) => i.id === ownProps.id),
  currency: state.member.tribe.currency,
})

export default connect(mapStateToProps)(MemberDetails)
