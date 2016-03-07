import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'

import DatePicker from 'material-ui/lib/date-picker/date-picker'
import IconButton from 'material-ui/lib/icon-button'
import ClearIcon from 'material-ui/lib/svg-icons/content/clear'

import styles from '../../constants/styles'

class DatePickerWrapper extends Component {

  constructor(props) {
    super(props)
    this.state = {
      today: new Date(),
    }
    //this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  // TODO: this does not get exposed to parent component due to the intl wrapper
  // focus() {
  //   ReactDOM.findDOMNode(this.refs.field.refs.input).focus()
  // }

  handleChange(event, date) {
    this.props.onChange(date.getTime())
  }

  handleClear() {
    this.props.onChange(null)
  }

  formatDate(date) {
    return isNaN(date) ? '' : this.props.intl.formatDate(date, {day: 'numeric', month: 'long', year: 'numeric'})
  }

  render() {
    const {onChange, onBlur, onFocus, value, ...other} = this.props // removing controlling props

    return (
      <div>
        <DatePicker ref="field"
          DateTimeFormat={Intl.DateTimeFormat}
          style={styles.field}
          wordings={{cancel: <FormattedMessage id="cancel" />}}
          textFieldStyle={styles.field}
          {...other}
          value={value ? new Date(value) : null}
          autoOk={true}
          firstDayOfWeek={1} //TODO: localize
          maxDate={this.state.today}
          formatDate={this.formatDate}
          onChange={this.handleChange}
        />
        <IconButton onTouchTap={this.handleClear} style={{float: 'right', marginTop: '-57px', marginRight: '-9px'}}>
          <ClearIcon color="#e0e0e0" />
        </IconButton>
      </div>
    )
  }

}

DatePickerWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  value: PropTypes.number,
  intl: intlShape.isRequired,
}

export default injectIntl(DatePickerWrapper)
