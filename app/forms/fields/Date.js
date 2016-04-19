import React, {Component, PropTypes} from 'react'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui/svg-icons/content/clear'
import * as colors from 'material-ui/styles/colors'

import styles from '../../constants/styles'

class DatePickerWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      time: null,
    }
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleClearDate = this.handleClearDate.bind(this)
    this.handleClearTime = this.handleClearTime.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      const time = new Date(props.value)
      if (time.getHours() !== 0 || time.getMinutes() !== 0) {
        this.setState({
          time: new Date(props.value),
        })
      }
    }
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.refs.input.focus()
  }

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
    return this.props.intl.formatDate(date, {day: 'numeric', month: 'long', year: 'numeric'})
  }

  render() {
    const {value} = this.props

    const localeData = moment.localeData()

    const containerStyle = {display: 'flex', flexWrap: 'wrap', marginRight: -16}
    const itemStyle = {flexBasis: 250, flexGrow: 1, marginRight: 16}
    const clearStyle = {float: 'right', marginTop: '-57px', marginRight: '-9px'}

    return (
      <div style={containerStyle}>
        <div style={itemStyle}>
          <DatePicker ref={this.ref}
            DateTimeFormat={Intl.DateTimeFormat}
            style={styles.field}
            textFieldStyle={styles.field}
            cancelLabel={<FormattedMessage id="cancel" />}
            autoOk={true}
            firstDayOfWeek={localeData.firstDayOfWeek()}
            formatDate={this.formatDate}
            floatingLabelText={<FormattedMessage id={'field.' + this.props.name} />}
            errorText={this.props.touched && this.props.error && <FormattedMessage id={'error.' + this.props.name} />}
            {...this.props}
            value={value && new Date(value)}
            onChange={this.handleDateChange}
            onBlur={null}
            onFocus={null}
          />
          {
            value && (
              <IconButton onTouchTap={this.handleClearDate} style={clearStyle}>
                <ClearIcon color={colors.grey300} />
              </IconButton>
            )
          }
        </div>

        {
          this.props.time && (
            <div style={itemStyle}>
              <TimePicker ref="time"
                style={styles.field}
                textFieldStyle={styles.field}
                cancelLabel={<FormattedMessage id="cancel" />}
                format="24hr"
                floatingLabelText={<FormattedMessage id={'field.time.' + this.props.name} />}
                value={this.state.time}
                onChange={this.handleTimeChange}
                autoOk={true}
              />
              {
                this.state.time && (
                  <IconButton onTouchTap={this.handleClearTime} style={clearStyle}>
                    <ClearIcon color={colors.grey300} />
                  </IconButton>
                )
              }
            </div>
          )
        }

      </div>
    )
  }

}

DatePickerWrapper.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number, //TODO: allow form init to send empty string
  intl: intlShape.isRequired,
  time: PropTypes.bool,
}

export default injectIntl(DatePickerWrapper, {withRef: true})
