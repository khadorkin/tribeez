import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, Animated, DatePickerAndroid, TimePickerAndroid} from 'react-native'
import {injectIntl, intlShape} from 'react-intl'

import FormattedDate from '../../components/FormattedDate'
import FormattedTime from '../../components/FormattedTime'
import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'
import IconButton from '../../components/IconButton'

import colors from '../../../common/constants/colors'

import {getLabelSize, getLabelPosition, ANIMATION_DURATION} from '../../dimensions'

class DateField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    min: PropTypes.number, // timestamp
    max: PropTypes.number, // timestamp
    time: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    const {input: {value}} = props

    let hasTime = false
    if (value) {
      const date = new Date(value)
      hasTime = (date.getHours() !== 0 || date.getMinutes() !== 0)
    }
    this.state = {
      dateLabelSize: new Animated.Value(getLabelSize(value)),
      dateLabelPosition: new Animated.Value(getLabelPosition(value)),
      timeLabelSize: new Animated.Value(getLabelSize(hasTime)),
      timeLabelPosition: new Animated.Value(getLabelPosition(hasTime)),
    }
    this.handleOpenDate = this.handleOpenDate.bind(this)
    this.handleOpenTime = this.handleOpenTime.bind(this)
    this.handleClearDate = this.handleClearDate.bind(this)
    this.handleClearTime = this.handleClearTime.bind(this)
    this.renderDate = this.renderDate.bind(this)
    this.renderTime = this.renderTime.bind(this)
  }

  componentWillReceiveProps(props) {
    const {input: {value}} = props

    const hasValue = Boolean(value)
    if (hasValue !== Boolean(this.props.input.value)) {
      Animated.timing(this.state.dateLabelSize, {
        toValue: getLabelSize(hasValue),
        duration: ANIMATION_DURATION,
      }).start()
      Animated.timing(this.state.dateLabelPosition, {
        toValue: getLabelPosition(hasValue),
        duration: ANIMATION_DURATION,
      }).start()
    }

    let hasTime = hasValue
    if (hasValue) {
      const date = new Date(value)
      hasTime = (date.getHours() !== 0 || date.getMinutes() !== 0)
    }
    Animated.timing(this.state.timeLabelSize, {
      toValue: getLabelSize(hasTime),
      duration: ANIMATION_DURATION,
    }).start()
    Animated.timing(this.state.timeLabelPosition, {
      toValue: getLabelPosition(hasTime),
      duration: ANIMATION_DURATION,
    }).start()
  }

  handleOpenDate() {
    const {input: {value, onChange}, min, max} = this.props

    DatePickerAndroid.open({
      date: value || Date.now(),
      minDate: min,
      maxDate: max,
    }).then((values) => {
      if (values.action === DatePickerAndroid.dismissedAction) {
        return
      }
      const picked = new Date(values.year, values.month, values.day)
      onChange(picked.getTime())
    })
  }

  handleOpenTime() {
    const {input: {value, onChange}} = this.props
    const date = (typeof value === 'number') ? new Date(value) : new Date()
    TimePickerAndroid.open({
      hour: date.getHours(),
      minute: date.getMinutes(),
    }).then((values) => {
      if (values.action === TimePickerAndroid.dismissedAction) {
        return
      }
      this.setState({
        time: true,
      })
      if (value) {
        const picked = new Date(value)
        picked.setHours(values.hour)
        picked.setMinutes(values.minute)
        onChange(picked.getTime())
      }
    })
  }

  handleClearDate() {
    this.props.input.onChange('')
  }

  handleClearTime() {
    const date = new Date(this.props.input.value)
    const picked = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.props.input.onChange(picked.getTime())
  }

  //TODO: distinguish date/time errors

  renderDate() {
    const {intl, input: {name, value}, meta: {touched, error}} = this.props

    let ts
    let label
    let clearButton
    if (value) {
      ts = Number(value)
      label = <FormattedDate value={ts} style={styles.value} />
      clearButton = <IconButton name="clear" size={16} color={colors.secondaryText} style={styles.clear} onPress={this.handleClearDate} />
    } else {
      ts = Date.now()
      label = <Text style={styles.value}>{' '}</Text>
    }

    const labelStyle = {
      fontSize: this.state.dateLabelSize,
      position: 'absolute',
      top: this.state.dateLabelPosition,
      color: (touched && error) ? colors.error : colors.secondaryText,
      backgroundColor: 'transparent',
    }

    return (
      <View style={styles.field}>
        <Touchable onPress={this.handleOpenDate} style={styles.valueContainer}>
          {label}
        </Touchable>
        <Animated.Text style={labelStyle} onPress={this.handleOpenDate} numberOfLines={1}>
          {intl.formatMessage({id: 'field.' + name})}
        </Animated.Text>
        {clearButton}
      </View>
    )
  }

  renderTime() {
    const {intl, input: {name, value}} = this.props

    let ts = Date.now()
    let label = <Text style={styles.value}>{' '}</Text>
    let clearButton
    if (value) {
      ts = Number(value)
      const date = new Date(ts)
      const time = (date.getHours() !== 0 || date.getMinutes() !== 0)
      if (time) {
        label = <FormattedTime value={ts} style={styles.value} />
        clearButton = <IconButton name="clear" size={16} color={colors.secondaryText} style={styles.clear} onPress={this.handleClearTime} />
      }
    }

    const labelStyle = {
      fontSize: this.state.timeLabelSize,
      position: 'absolute',
      top: this.state.timeLabelPosition,
      color: colors.secondaryText,
      backgroundColor: 'transparent',
    }

    return (
      <View style={styles.field}>
        <Touchable onPress={this.handleOpenTime} style={styles.valueContainer}>
          {label}
        </Touchable>
        <Animated.Text style={labelStyle} onPress={this.handleOpenTime} numberOfLines={1}>
          {intl.formatMessage({id: 'field.time.' + name})}
        </Animated.Text>
        {clearButton}
      </View>
    )
  }

  render() {
    const {time, input: {name}, meta: {touched, error}} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.fields}>
          {this.renderDate()}
          {time && this.renderTime()}
        </View>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  fields: {
    flexDirection: 'row',
  },
  field: {
    paddingTop: 30,
    marginHorizontal: 8,
    flex: 1,
    position: 'relative',
  },
  valueContainer: {
    borderBottomWidth: 0.8,
    borderBottomColor: colors.underline,
    paddingTop: 6,
    paddingBottom: 9,
  },
  value: {
    fontSize: 16,
    color: colors.primaryText,
  },
  clear: {
    position: 'absolute',
    top: 29,
    right: 0,
  },
  error: {
    color: colors.error,
    margin: 8,
    fontSize: 12,
  },
})

export default injectIntl(DateField)
