import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl'

import Card from 'material-ui/lib/card/card'
import CardText from 'material-ui/lib/card/card-text'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/select-field'
import MenuItem from 'material-ui/lib/menus/menu-item'
import CardActions from 'material-ui/lib/card/card-actions'
import RaisedButton from 'material-ui/lib/raised-button'

import currencies from '../resources/currencies'
import langs from '../resources/langs'
import {TRIBE_TYPES} from '../constants/product'

import placesAutocomplete from '../utils/placesAutocomplete'

import styles from '../constants/styles'

import postTribe from '../actions/postTribe'

const currencyItems = currencies.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={`${item.name} (${item.code})`} />
)
const langItems = langs.map((item) =>
  <MenuItem value={item.code} key={item.code} primaryText={item.name} />
)
const typeItems = TRIBE_TYPES.map((type) =>
  <MenuItem value={type} key={type} primaryText={type} />
)

class NewTribe extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: {},
    }
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
  }

  componentDidUpdate() {
    if (['tribe_name', 'city'].indexOf(this.props.error) >= 0) {
      //ReactDOM.findDOMNode(this.refs[this.props.error].refs.input).focus()
    }
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
    this.props.postTribe({
      tribe_name: this.refs.tribe_name.getValue(),
      tribe_type: this.state.tribe_type,
      city_name: this.state.city.city_name,
      country_code: this.state.city.country_code,
      place_id: this.state.city.place_id,
      currency: this.state.currency,
    })
  }

  //TODO: max fields width
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Card>
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
            <RaisedButton label="Create tribe" type="submit" />
            <p className="error">{this.props.error === 'other' && <FormattedMessage id="error.other" />}</p>
          </CardActions>
        </Card>
      </form>
    )
  }

}

NewTribe.propTypes = {
  lang: PropTypes.string.isRequired,
  error: PropTypes.string,
  postTribe: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  lang: state.app.lang,
  error: state.tribe.error,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postTribe,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(NewTribe)
