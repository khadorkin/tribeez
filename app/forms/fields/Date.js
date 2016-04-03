import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import DatePicker from 'material-ui/lib/date-picker/date-picker'
import TimePicker from 'material-ui/lib/time-picker/time-picker'
import IconButton from 'material-ui/lib/icon-button'
import ClearIcon from 'material-ui/lib/svg-icons/content/clear'
import * as colors from 'material-ui/lib/styles/colors'

import styles from '../../constants/styles'

class DatePickerWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: null,
    }
    //this.focus = this.focus.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleClearDate = this.handleClearDate.bind(this)
    this.handleClearTime = this.handleClearTime.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  // TODO: this does not get exposed to parent component due to the intl wrapper
  // focus() {
  //   ReactDOM.findDOMNode(this.refs.field.refs.input).focus()
  // }

  handleDateChange(event, date) {
    if (this.state.time) {
      date.setHours(this.state.time.getHours())
      date.setMinutes(this.state.time.getMinutes())
    }
    this.props.onChange(date.getTime())
  }

  handleTimeChange(event, time) {
    this.setState({
      time,
    })
    if (this.props.value) {
      const date = new Date(this.props.value)
      date.setHours(time.getHours())
      date.setMinutes(time.getMinutes())
      this.props.onChange(date.getTime())
    }
  }

  handleClearDate() {
    this.props.onChange(null)
  }

  handleClearTime() {
    this.setState({
      time: null,
    })
    if (this.props.value) {
      const date = new Date(this.props.value)
      date.setHours(0)
      date.setMinutes(0)
      this.props.onChange(date.getTime())
    }
  }

  formatDate(date) {
    return isNaN(date) ? '' : this.props.intl.formatDate(date, {day: 'numeric', month: 'long', year: 'numeric'})
  }

  render() {
    const {onChange, onBlur, onFocus, value, ...other} = this.props // removing controlling props

    const localeData = moment.localeData()

    const containerStyle = {display: 'flex', flexWrap: 'wrap', marginRight: -16}
    const itemStyle = {flexBasis: 250, flexGrow: 1, marginRight: 16}

    return (
      <div style={containerStyle}>
        <div style={itemStyle}>
          <DatePicker ref="field"
            DateTimeFormat={Intl.DateTimeFormat}
            style={styles.field}
            textFieldStyle={styles.field}
            cancelLabel={<FormattedMessage id="cancel" />}
            {...other}
            value={value ? new Date(value) : null}
            autoOk={true}
            firstDayOfWeek={localeData.firstDayOfWeek()}
            formatDate={this.formatDate}
            onChange={this.handleDateChange}
          />
          <IconButton onTouchTap={this.handleClearDate} style={{float: 'right', marginTop: '-57px', marginRight: '-9px'}}>
            <ClearIcon color={colors.grey300} />
          </IconButton>
        </div>

        {
          this.props.time && (
            <div style={itemStyle}>
              <TimePicker ref="time"
                style={styles.field}
                textFieldStyle={styles.field}
                cancelLabel={<FormattedMessage id="cancel" />}
                format="24hr"
                floatingLabelText={this.props.timeLabel}
                value={this.state.time}
                onChange={this.handleTimeChange}
                autoOk={true}
              />
              <IconButton onTouchTap={this.handleClearTime} style={{float: 'right', marginTop: '-57px', marginRight: '-9px'}}>
                <ClearIcon color={colors.grey300} />
              </IconButton>
            </div>
          )
        }

      </div>
    )
  }

}

DatePickerWrapper.propTypes = {
  // from parent:
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.number,
  intl: intlShape.isRequired,
  time: PropTypes.bool,
  timeLabel: PropTypes.string,
}

export default injectIntl(DatePickerWrapper)
