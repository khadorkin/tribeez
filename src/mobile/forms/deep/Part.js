import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import {MKTextField} from 'react-native-material-kit'

import IconButton from '../../components/IconButton'

import colors from '../../../common/constants/colors'

class Part extends Component {
  static propTypes = {
    // from parent form:
    user: PropTypes.object,
    amount: PropTypes.object.isRequired,
    currency: PropTypes.string,
    method: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)
    this.handleRemoveShare = this.handleRemoveShare.bind(this)
    this.handleAddShare = this.handleAddShare.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleRemoveShare() {
    if (this.props.amount.value > 0) {
      this.props.amount.onChange(this.props.amount.value - 1)
    }
  }

  handleAddShare() {
    this.props.amount.onChange(this.props.amount.value + 1)
  }

  handleChange(value) {
    const val = Number(value)
    if (!isNaN(val)) {
      this.props.amount.onChange(val)
    }
  }

  render() {
    const {user, amount, method} = this.props

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
            <View style={styles.amount}>
              <IconButton onPress={this.handleRemoveShare} name="remove" style={styles.button} />
              <MKTextField
                style={styles.shareField}
                textInputStyle={styles.shareInput}
                keyboardType="numeric"
                {...amount}
                value={String(amount.value)}
                onChange={null}
                onChangeText={this.handleChange}
              />
              <IconButton onPress={this.handleAddShare} name="add" style={[styles.button, styles.right]} />
            </View>
          ) : (
            <View style={styles.amount}>
              <MKTextField
                style={styles.amountField}
                textInputStyle={styles.amountInput}
                keyboardType="numeric"
                {...amount}
                value={String(amount.value)}
              />
              <Text style={styles.currency}>
                {this.props.currency}
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
  amount: {
    flexDirection: 'row',
    margin: 5,
  },
  button: {
    paddingVertical: 6,
    marginVertical: -8,
  },
  right: {
    marginRight: -12,
  },
  shareField: {
    width: 50,
  },
  shareInput: {
    textAlign: 'center',
  },
  amountField: {
    width: 120,
  },
  amountInput: {
    paddingRight: 50,
  },
  currency: {
    position: 'absolute',
    top: 5.5,
    right: 3,
  },
})

export default Part
