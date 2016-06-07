import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View, Text} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class MoneyField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    currency: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  render() {
    const {name, value, touched, error, currency, ...props} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          ref={this.ref}
          style={styles.field}
          keyboardType="numeric"
          underlineColorAndroid={colors.underline}
          {...props}
          value={typeof value === 'number' ? String(value) : value}
        />
        <Text style={styles.currency}>{currency}</Text>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginHorizontal: 5,
  },
  field: {
    height: 39,
  },
  currency: {
    position: 'absolute',
    top: 28,
    right: 5,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default MoneyField
