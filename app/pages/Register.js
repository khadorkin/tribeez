import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardActions from 'material-ui/lib/card/card-actions'
import CardTitle from 'material-ui/lib/card/card-title'
import RaisedButton from 'material-ui/lib/raised-button'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'

import currencies from '../resources/currencies'
import langs from '../resources/langs'
import {TRIBE_TYPES} from '../constants/product'

import placesAutocomplete from '../utils/placesAutocomplete'
import recaptcha from '../utils/recaptcha'

import updateLang from '../actions/updateLang'
import postRegister from '../actions/postRegister'

import styles from '../constants/styles'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class Register extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: {},
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  /*eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    placesAutocomplete('city', (infos) => {
      this.setState({
        city: infos,
      })
    }, (place) => {
      //TODO: the user can still remove the field content and not press enter => the state will remain
      this.setState({
        city: {},
      })
    }, this.props.lang)

    recaptcha.mount('captcha', (captcha) => {
      this.setState({
        captcha,
      })
    })
  }

  componentDidUpdate() {
    const ref = /^email/.test(this.props.error) ? 'email' : this.props.error
    if (['name', 'email', 'password', 'tribe_name', 'city'].indexOf(ref) >= 0 ) {
      ReactDOM.findDOMNode(this.refs[ref].refs.input).focus()
    }
  }

  handleLangChange(event, index, value) {
    this.props.updateLang(value)
  }

  handleTypeChange(event, index, value) {
    this.setState({
      tribe_type: value,
    })
  }

  handleCurrencyChange(event, index, value) {
    this.setState({
      currency: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.postRegister({
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      lang: this.props.lang,
      tribe_name: this.refs.tribe_name.getValue(),
      tribe_type: this.state.tribe_type,
      city_name: this.state.city.city_name,
      country_code: this.state.city.country_code,
      place_id: this.state.city.place_id,
      currency: this.state.currency,
      captcha: this.state.captcha,
    })
    recaptcha.reset()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="main">
        <Card>
          <CardTitle title="You" />
          <CardText>
            <TextField ref="name"
              style={styles.field}
              floatingLabelText="Your name"
              required={true}
              errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />}
            />
            <TextField ref="email"
              style={styles.field}
              type="email"
              floatingLabelText="Email"
              required={true}
              errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={`error.${this.props.error}`} />}
            />
            <TextField ref="password"
              style={styles.field}
              type="password"
              floatingLabelText="Password"
              required={true}
              errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />}
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
          </CardText>
          <CardTitle title="Your tribe" />
          <CardText>
            <TextField ref="tribe_name"
              style={styles.field}
              floatingLabelText="Tribe name"
              required={true}
              errorText={this.props.error === 'tribe_name' && <FormattedMessage id="error.tribe_name" />}
            />
            <SelectField
              style={styles.field}
              floatingLabelText="Type"
              value={this.state.tribe_type}
              onChange={this.handleTypeChange}
              errorText={this.props.error === 'tribe_type' && <FormattedMessage id="error.tribe_type" />}
            >
              {typeItems}
            </SelectField>
            <TextField ref="city"
              style={styles.field}
              autoComplete="off"
              id="city"
              placeholder=""
              floatingLabelText="City"
              required={true}
              errorText={this.props.error === 'city' && <FormattedMessage id="error.city" />}
            />
            <SelectField
              style={styles.field}
              floatingLabelText="Currency"
              value={this.state.currency}
              onChange={this.handleCurrencyChange}
              errorText={this.props.error === 'currency' && <FormattedMessage id="error.currency" />}
            >
              {currencyItems}
            </SelectField>
          </CardText>
          <CardActions style={styles.actions}>
            <div id="captcha" style={{display: 'inline-block'}}></div>
            <p className="error" style={{fontSize: '12px', marginTop: 0}}>{this.props.error === 'captcha' && <FormattedMessage id="error.captcha" />}</p>
            <RaisedButton label="Register & create this tribe" type="submit" style={{marginTop: '30px'}} />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Register.propTypes = {
  error: PropTypes.string,
  lang: PropTypes.string.isRequired,
  updateLang: PropTypes.func.isRequired,
  postRegister: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  error: state.register.error,
  lang: state.app.lang,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateLang,
  postRegister,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
