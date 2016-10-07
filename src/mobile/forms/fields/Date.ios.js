import React, {Component, PropTypes} from 'react'
import {View, Text, Animated, StyleSheet, DatePickerIOS, Modal, Dimensions} from 'react-native'
import {injectIntl, intlShape} from 'react-intl'

import FormattedMessage from '../../components/FormattedMessage'
import FormattedDate from '../../components/FormattedDate'
import FormattedTime from '../../components/FormattedTime'
import Touchable from '../../components/Touchable'
import Button from '../../components/Button'
import IconButton from '../../components/IconButton'

import colors from '../../../common/constants/colors'

import {elevation, getLabelSize, getLabelPosition, ANIMATION_DURATION} from '../../dimensions'

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
      showDatePicker: false,
      showTimePicker: false,
      dateLabelSize: new Animated.Value(getLabelSize(value)),
      dateLabelPosition: new Animated.Value(getLabelPosition(value)),
      timeLabelSize: new Animated.Value(getLabelSize(hasTime)),
      timeLabelPosition: new Animated.Value(getLabelPosition(hasTime)),
    }
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeTime = this.handleChangeTime.bind(this)
    this.handleOpenDate = this.handleOpenDate.bind(this)
    this.handleCloseDate = this.handleCloseDate.bind(this)
    this.handleOpenTime = this.handleOpenTime.bind(this)
    this.handleCloseTime = this.handleCloseTime.bind(this)
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

  handleChangeDate(date) {
    const picked = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    this.props.input.onChange(picked.getTime())
  }

  handleChangeTime(date) {
    this.props.input.onChange(date.getTime())
  }

  handleOpenDate() {
    this.setState({
      showDatePicker: true,
    })
  }

  handleCloseDate() {
    const {input} = this.props

    if (!input.value) {
      const date = new Date()
      const picked = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      input.onChange(picked.getTime())
    }
    this.setState({
      showDatePicker: false,
    })
  }

  handleOpenTime() {
    this.setState({
      showTimePicker: true,
    })
  }

  handleCloseTime() {
    const {input} = this.props

    if (!input.value) {
      input.onChange(Date.now())
    }
    this.setState({
      showTimePicker: false,
    })
  }

  handleClearDate() {
    this.props.input.onChange('')
  }

  handleClearTime() {
    const {input} = this.props

    const date = new Date(input.value)
    const picked = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    input.onChange(picked.getTime())
  }

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
        <Modal animationType="fade" visible={this.state.showDatePicker} onRequestClose={this.handleCloseDate} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DatePickerIOS mode="date" date={new Date(ts)} onDateChange={this.handleChangeDate} />
              <Button id="ok" onPress={this.handleCloseDate} />
            </View>
          </View>
        </Modal>
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
        <Modal animationType="fade" visible={this.state.showTimePicker} onRequestClose={this.handleCloseTime} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DatePickerIOS mode="time" date={new Date(ts)} onDateChange={this.handleChangeTime} />
              <Button id="ok" onPress={this.handleCloseTime} />
            </View>
          </View>
        </Modal>
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
    top: -36,
    right: 0,
  },
  error: {
    color: colors.error,
    margin: 8,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.overlay,
    ...elevation(6),
  },
  modalContent: {
    backgroundColor: colors.background,
    width: Dimensions.get('window').width * 0.8,
  },
})

export default injectIntl(DateField)
