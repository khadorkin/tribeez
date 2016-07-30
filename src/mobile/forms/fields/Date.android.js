import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, DatePickerAndroid, TimePickerAndroid} from 'react-native'

import FormattedDate from '../../components/FormattedDate'
import FormattedTime from '../../components/FormattedTime'
import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'

import colors from '../../../common/constants/colors'

class DateField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    min: PropTypes.number, // timestamp
    max: PropTypes.number, // timestamp
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
    DatePickerAndroid.open({
      date: this.props.value || Date.now(),
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
      //is24Hour: true, //TODO: depends on phone's locale?
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

  //TODO: distinguish date/time errors

  render() {
    const {name, value, touched, error/*, ...props*/} = this.props

    let dateLabel = <Text style={styles.label}>{' '}</Text>
    let datePlaceholder = <FormattedMessage id={'field.' + name} style={styles.placeholder} />
    let timeLabel = <Text style={styles.label}>{' '}</Text>
    let timePlaceholder = <FormattedMessage id={'field.time.' + name} style={styles.placeholder} />

    if (value) {
      dateLabel = <FormattedMessage id={'field.' + name} style={styles.label} />
      datePlaceholder = <FormattedDate value={Number(value)} style={styles.date} />
      if (this.state.time) {
        timeLabel = <FormattedMessage id={'field.time.' + name} style={styles.label} />
        timePlaceholder = <FormattedTime value={this.state.time && Number(value)} style={styles.date} />
      }
    }

    const errorText = <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />

    return (
      <View>
        <View style={styles.container}>
          {dateLabel}
          <Touchable onPress={this.handleOpenDate} style={styles.field}>
            {datePlaceholder}
          </Touchable>
          {errorText}
        </View>
        {
          this.props.time && (
            <View style={styles.container}>
              {timeLabel}
              <Touchable onPress={this.handleOpenTime} style={styles.field}>
                {timePlaceholder}
              </Touchable>
              {errorText}
            </View>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  label: {
    fontSize: 12,
  },
  field: {
    paddingTop: 9,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.underline,
  },
  placeholder: {
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    color: colors.text,
  },
  error: {
    color: colors.error,
    marginVertical: 8,
  },
})

export default DateField
