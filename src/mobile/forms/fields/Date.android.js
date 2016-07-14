import React, {Component, PropTypes} from 'react'
import {Touchable, StyleSheet, View, DatePickerAndroid, TimePickerAndroid} from 'react-native'

import FormattedDate from '../../components/FormattedDate'
import FormattedTime from '../../components/FormattedTime'
import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class SelectField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.object, // date
    max: PropTypes.object, // date
    time: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      time: false,
    }
    this.handleOpenDate = this.handleOpenDate.bind(this)
    this.handleOpenTime = this.handleOpenTime.bind(this)
  }

  handleOpenDate() {
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

  handleOpenTime() {
    const date = (typeof this.props.value === 'number') ? new Date(this.props.value) : new Date()
    TimePickerAndroid.open({
      hour: date.getHours(),
      minute: date.getMinutes(),
      //is24Hour: true, //depends on phone's locale?
    }).then((values) => {
      if (values.action === TimePickerAndroid.dismissedAction) {
        return
      }
      this.setState({
        time: true,
      })
      if (this.props.value) {
        const picked = new Date(this.props.value)
        picked.setHours(values.hour)
        picked.setMinutes(values.minute)
        this.props.onChange(picked.getTime())
      }
    })
  }

  render() {
    const {name, value, touched, error/*, ...props*/} = this.props

    return (
      <View>
        <View style={styles.container}>
          <FormattedMessage id={'field.' + name} style={styles.label} />
          <Touchable onPress={this.handleOpenDate} style={styles.field}>
            <FormattedDate value={Number(value)} style={styles.date} />
          </Touchable>
          <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
        </View>
        {
          this.props.time && (
            <View style={styles.container}>
              <FormattedMessage id={'field.time.' + name} style={styles.label} />
              <Touchable onPress={this.handleOpenTime} style={styles.field}>
                <FormattedTime value={this.state.time && Number(value)} style={styles.date} />
              </Touchable>
              <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
            </View>
          )
        }
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
    paddingTop: 9,
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  date: {
    color: 'black',
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default SelectField
