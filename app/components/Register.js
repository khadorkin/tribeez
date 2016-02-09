import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { FormattedMessage } from 'react-intl'

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
import lang from '../utils/lang'

import register from '../actions/register'

class Register extends Component {

  constructor(props) {
    super(props)

    this.state = {
      lang: lang.getDefault(),
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleLangChange = this.handleLangChange.bind(this)
  }

  componentDidMount() {
    const gapi = document.createElement('script')
    gapi.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&language=fr' // &callback=initAutocomplete&key=AIzaSyDIFUJPOdN0JtTtMYBc743QA_NtzYL1S1M&signed_in=true
    gapi.async = true
    gapi.defer = true
    gapi.onload = () => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {types: ['(cities)']})
      autocomplete.addListener('place_changed', () => {
        let place = autocomplete.getPlace()
        if (!place || !place.address_components) {
          return
        }
        let country = place.address_components.find((component) => {
          return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
        })
        if (country) {
          this.setState({
            city_name: place.name,
            country_code: country.short_name,
            place_id: place.place_id,
          })
        }
      })
    }
    document.body.appendChild(gapi)
  }

  handleLangChange(event, index, value) {
    this.setState({
      lang: value,
    })
  }

  handleCurrencyChange(event, index, value) {
    this.setState({
      currency: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.register({
      name: this.refs.name.getValue(),
      email: this.refs.email.getValue(),
      password: this.refs.password.getValue(),
      lang: this.state.lang,
      tribe_name: this.refs.tribe_name.getValue(),
      city_name: this.state.city_name,
      country_code: this.state.country_code,
      place_id: this.state.place_id,
      currency: this.state.currency,
    })
  }

  render() {
    const currencyItems = currencies.map((item) => <MenuItem value={item.code} key={item.code} primaryText={item.name + ' (' + item.code + ')'} />)
    const langItems = langs.map((item) => <MenuItem value={item.code} key={item.code} primaryText={item.name} />)

    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
          <CardTitle title="Register" />
          <CardText>
            <TextField ref="name" floatingLabelText="Your name" required errorText={this.props.error === 'name' && <FormattedMessage id="error.name" />} />
            <br />
            <TextField ref="email" floatingLabelText="Email" required errorText={this.props.error && this.props.error.indexOf('email') === 0 && <FormattedMessage id={'error.' + this.props.error} />} />
            <br />
            <TextField ref="password" type="password" floatingLabelText="Password" required errorText={this.props.error === 'password' && <FormattedMessage id="error.password" />} />
            <br />
            <SelectField ref="lang" floatingLabelText="Language" value={this.state.lang} onChange={this.handleLangChange} errorText={this.props.error === 'lang' && <FormattedMessage id="error.lang" />}>
              {langItems}
            </SelectField>
          </CardText>
        </Card>
        <br />
        <Card>
          <CardTitle title="Your tribe" />
          <CardText>
            <TextField ref="tribe_name" floatingLabelText="Tribe name" required errorText={this.props.error === 'tribe_name' && <FormattedMessage id="error.tribe_name" />} />
            <br />
            <TextField ref="city" autoComplete="off" id="autocomplete" placeholder="" floatingLabelText="City" required errorText={['city_name', 'country_code', 'place_id'].indexOf(this.props.error) >=0 && <FormattedMessage id="error.city" />} />
            <br />
            <SelectField ref="currency" floatingLabelText="Currency" value={this.state.currency} onChange={this.handleCurrencyChange} errorText={this.props.error === 'currency' && <FormattedMessage id="error.currency" />}>
              {currencyItems}
            </SelectField>
          </CardText>
          <CardActions>
            <RaisedButton label="Register & create this tribe" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

Register.propTypes = {
  error: PropTypes.string,
}

const mapStateToProps = (state) => ({
  error: state.register.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  register,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Register)
