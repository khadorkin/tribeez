import React, {Component, PropTypes} from 'react'
import {Picker, StyleSheet, View} from 'react-native'

import FormattedMessage from './FormattedMessage'

class SelectField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value/*, index*/) {
    this.props.onChange(value)
  }

  render() {
    const {name, value, items, style, touched, error/*, ...props*/} = this.props

    const mergedStyle = style ? {...styles.field, ...style} : styles.field

    const children = items.map((item) =>
      <Picker.Item label={item.name} value={item.code} key={item.code} />
    )

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Picker selectedValue={value} onValueChange={this.handleChange} style={mergedStyle}>
          {children}
        </Picker>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    //padding: 5,
  },
  label: {
    //
  },
  field: {
    paddingTop: 0,
  },
  error: {
    color: '#F44336',
  },
})

export default SelectField
