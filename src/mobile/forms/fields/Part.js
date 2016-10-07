import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

import {connect} from 'react-redux'

import IconButton from '../../components/IconButton'

import colors from '../../../common/constants/colors'

class Part extends Component {
  static propTypes = {
    // from parent form:
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    method: PropTypes.string.isRequired,
    // from redux:
    userMap: PropTypes.object.isRequired,
    currency: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleRemoveShare = this.handleRemoveShare.bind(this)
    this.handleAddShare = this.handleAddShare.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRemoveShare() {
    const {input} = this.props
    const {uid, amount} = input.value

    if (amount > 0) {
      input.onChange({
        uid,
        amount: amount - 1,
      })
    }
  }

  handleAddShare() {
    const {input} = this.props
    const {uid, amount} = input.value

    input.onChange({
      uid,
      amount: amount + 1,
    })
  }

  handleChange(amount) {
    const {input} = this.props
    const {uid} = input.value

    input.onChange({
      uid,
      amount,
    })
  }

  render() {
    const {userMap, currency, input, method} = this.props
    const {uid, amount} = input.value

    const user = userMap[uid]

    if (!user) {
      return null // in cases users are not loaded yet
    }

    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {user.name}
        </Text>
        {
          method === 'shares' ? (
            <View style={styles.value}>
              <IconButton size={26} onPress={this.handleRemoveShare} name="remove" style={styles.button} />
              <TextInput
                style={styles.share}
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                value={String(amount)}
                onChangeText={this.handleChange}
              />
              <IconButton size={26} onPress={this.handleAddShare} name="add" style={[styles.button, styles.right]} />
            </View>
          ) : (
            <View style={styles.value}>
              <TextInput
                style={styles.amount}
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                value={String(amount)}
                onChangeText={this.handleChange}
              />
              <Text style={styles.currency}>
                {currency}
              </Text>
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
    flexDirection: 'row',
  },
  label: {
    flex: 1,
    color: colors.primaryText,
    marginHorizontal: 8,
    marginVertical: 5,
  },
  value: {
    flexDirection: 'row',
    marginBottom: 8,
    marginRight: 8,
  },
  button: {
    paddingVertical: 6,
    marginVertical: -8,
  },
  right: {
    marginRight: -12,
  },
  share: {
    width: 50,
    height: 30,
    textAlign: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
    padding: 0,
    color: colors.primaryText,
  },
  amount: {
    width: 120,
    height: 30,
    paddingRight: 50,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
    padding: 0,
    color: colors.primaryText,
  },
  currency: {
    position: 'absolute',
    top: 5.5,
    right: 3,
    color: colors.secondaryText,
  },
})

const mapStateToProps = (state) => ({
  userMap: state.tribe.userMap,
  currency: state.tribe.currency,
})

export default connect(mapStateToProps)(Part)
