import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage, FormattedDate, injectIntl, intlShape} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import DatePicker from 'material-ui/lib/date-picker/date-picker'
import Snackbar from 'material-ui/lib/snackbar'

import IconButton from 'material-ui/lib/icon-button'
import ClearIcon from 'material-ui/lib/svg-icons/content/clear'

import langs from '../resources/langs'

import putProfile from '../actions/putProfile'
import updateProfile from '../actions/updateProfile'
import updateLang from '../actions/updateLang'

import styles from '../constants/styles'

const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)

const today = new Date()

class Profile extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleBirthdateChange = this.handleBirthdateChange.bind(this)
    this.handleBirthdateClear = this.handleBirthdateClear.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.handleSnackClose = this.handleSnackClose.bind(this)
  }

  componentDidUpdate() {
    const ref = this.state.error || (/^email/.test(this.props.error) ? 'email' : this.props.error)
    if (['name', 'email', 'password', 'password_confirmation'].indexOf(ref) >= 0 ) {
      ReactDOM.findDOMNode(this.refs[ref].refs.input).focus()
    }
  }

  handleNameChange(event) {
    this.props.updateProfile({name: event.target.value})
  }

  handleEmailChange(event) {
    this.props.updateProfile({email: event.target.value})
  }

  handleLangChange(event, index, value) {
    this.props.updateLang(value)
  }

  handlePhoneChange(event) {
    this.props.updateProfile({phone: event.target.value})
  }

  handleBirthdateChange(event, date) {
    this.props.updateProfile({birthdate: date})
  }
  handleBirthdateClear() {
    this.props.updateProfile({birthdate: null})
  }

  formatDate(date) {
    return isNaN(date) ? '' : this.props.intl.formatDate(date, {day: 'numeric', month: 'long', year: 'numeric'})
  }

  handleSubmit(event) {
    event.preventDefault()
    const password = this.refs.password.getValue()
    if (password && (password !== this.refs.password_confirmation.getValue())) {
      this.setState({
        error: 'password_confirmation',
      })
    } else {
      this.setState({
        error: null,
      })
      this.props.putProfile({
        name: this.props.name,
        email: this.props.email,
        password: password,
        lang: this.props.lang,
        phone: this.props.phone,
        birthdate: Number(this.props.birthdate) || null, // will call date.getTime() if it's a Date object
      })
    }
  }

  handleSnackClose() {
    this.props.updateProfile({
      snack: false,
    })
  }

  render() {
    return (
      <Card>
        <form onSubmit={this.handleSubmit}>
          <CardTitle subtitle={<span>To change your profile picture, go to <a href="https://gravatar.com" target="_blank">gravatar.com</a></span>} />
          <CardText>
            <TextField ref="name"
              style={styles.field}
              floatingLabelText="Your name"
              value={this.props.name}
              onChange={this.handleNameChange}
              required={true}
              errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />}
            />
            <TextField ref="email"
              style={styles.field}
              type="email"
              floatingLabelText="Email"
              value={this.props.email}
              onChange={this.handleEmailChange}
              required={true}
              errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={`error.${this.props.error}`} />}
            />
            <SelectField
              style={styles.field}
              floatingLabelText="Language"
              value={this.props.lang}
              onChange={this.handleLangChange}
              errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}
            >
              {langItems}
            </SelectField>
            <TextField ref="phone"
              style={styles.field}
              floatingLabelText="Phone number"
              value={this.props.phone}
              onChange={this.handlePhoneChange}
              errorText={this.props.error === 'phone' && <FormattedMessage id="error.phone" />}
            />
            <DatePicker //TODO: "clear" button
              DateTimeFormat={Intl.DateTimeFormat}
              textFieldStyle={styles.field}
              floatingLabelText="Birthdate"
              autoOk={true}
              wordings={{cancel: <FormattedMessage id="cancel" />}}
              value={this.props.birthdate}
              //defaultDate={new Date(500299200000)}
              firstDayOfWeek={1} //TODO: localize
              locale={this.props.lang}
              maxDate={today}
              formatDate={this.formatDate}
              onChange={this.handleBirthdateChange}
              errorText={this.props.error === 'birthdate' && <FormattedMessage id="error.birthdate" />}
            />
            <IconButton onTouchTap={this.handleBirthdateClear} style={{float: 'right', marginTop: '-57px', marginRight: '-9px'}}>
              <ClearIcon color="#e0e0e0" />
            </IconButton>
            <TextField ref="password"
              style={styles.field}
              type="password"
              floatingLabelText="Password (leave blank for no change)"
              errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />}
            />
            <TextField ref="password_confirmation"
              style={styles.field}
              type="password"
              floatingLabelText="Password (confirmation)"
              errorText={this.state.error === 'password_confirmation' && <FormattedMessage id="error.password_confirmation" />}
            />
          </CardText>
          <CardActions style={styles.actions}>
            <RaisedButton label="Save profile" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </form>

        <Snackbar
          open={this.props.snack}
          message="Profile updated!"
          onRequestClose={this.handleSnackClose}
          autoHideDuration={5000}
        />
      </Card>
    )
  }

}

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  lang: PropTypes.string,
  phone: PropTypes.string,
  birthdate: PropTypes.object,
  error: PropTypes.string,
  updateLang: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  putProfile: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  snack: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  name: state.member.user.name,
  email: state.member.user.email,
  lang: state.app.lang,
  phone: state.member.user.phone,
  birthdate: state.member.user.birthdate ? new Date(state.member.user.birthdate) : null,
  error: state.profile.error,
  snack: state.profile.snack,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateLang,
  updateProfile,
  putProfile,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Profile))
