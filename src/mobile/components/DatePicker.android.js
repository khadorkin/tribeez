import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet, View, DatePickerAndroid} from 'react-native'

import FormattedDate from './FormattedDate'
import FormattedMessage from './FormattedMessage'

import colors from '../../common/constants/colors'

class SelectField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.object, // date
    max: PropTypes.object, // date
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.handleOpen = this.handleOpen.bind(this)
  }

  handleOpen() {
    const date = (typeof this.props.value === 'number') ? new Date(this.props.value) : new Date()
    DatePickerAndroid.open({
      date,
      minDate: this.props.min,
      maxDate: this.props.max,
    }).then((values) => {
      if (values.action === DatePickerAndroid.dismissedAction) {
        return
      }
      const picked = new Date(values.year, values.month, values.day)
      this.props.onChange(picked.getTime())
    })
  }

  render() {
    const {name, value, touched, error/*, ...props*/} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TouchableOpacity onPress={this.handleOpen} style={styles.field}>
          <FormattedDate value={Number(value)} style={styles.date} />
        </TouchableOpacity>
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
    marginHorizontal: 5,
    paddingTop: 5,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  date: {
    color: 'black',
  },
  error: {
    color: colors.error,
  },
})

export default SelectField
