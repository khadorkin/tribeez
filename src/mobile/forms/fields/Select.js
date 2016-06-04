import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class SelectField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value/*, index*/) {
    this.props.onChange(value)
  }

  render() {
    const {name, value, items, touched, error/*, ...props*/} = this.props

    const children = items.map((item) =>
      <Picker.Item label={item.name} value={item.code} key={item.code} />
    )

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Picker selectedValue={value} onValueChange={this.handleChange}>
          {children}
        </Picker>
        <View style={styles.bottom} />
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
  bottom: {
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default SelectField
