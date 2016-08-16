import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import AutoComplete from 'material-ui/AutoComplete'

import styles from '../../styles'

import scriptLoader from '../../utils/scriptLoader'

import config from '../../../common/config'

/*global google:false*/

class CityField extends Component {
  static propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]), //TODO: because MUI sets it to a string instead of object
  }

  constructor(props) {
    super(props)
    this.state = {
      textPredictions: [],
      predictions: [],
    }
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showPredictions = this.showPredictions.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleDetails = this.handleDetails.bind(this)
  }

  componentDidMount() {
    window.onGooglePlaces = () => {
      this.autocomplete = new google.maps.places.AutocompleteService()
      this.places = new google.maps.places.PlacesService(document.createElement('div'))
    }
    if (window.google) {
      window.onGooglePlaces()
    } else {
      scriptLoader.load('https://maps.googleapis.com/maps/api/js?key=' + config.google_web_key
                      + '&libraries=places&callback=onGooglePlaces&language=en') //TODO: localized cities?
    }
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.refs.searchTextField.refs.input.focus()
  }

  filter() {
    return true // we don't want to filter
  }

  handleChange(input) {
    this.props.onChange({
      name: input,
    })
    if (!input) {
      this.setState({
        textPredictions: [],
        predictions: [],
      })
    } else if (this.autocomplete) {
      this.autocomplete.getPlacePredictions({input, types: ['(cities)']}, this.showPredictions)
    }
  }

  showPredictions(predictions) {
    if (!predictions) {
      predictions = []
    }
    this.setState({
      textPredictions: predictions.map((prediction) => prediction.description),
      predictions,
    })
  }

  handleSelect(value, index) {
    const prediction = this.state.predictions[index]
    this.props.onChange({
      name: value, // could be also place.formatted_address, but place.name does not contain country
      place_id: prediction.place_id,
      // call getDetails to get the country code
    })
    this.places.getDetails({
      placeId: prediction.place_id,
    }, this.handleDetails)
    // MUI sets this.props.value here as a string? //TODO: PR?
  }

  handleDetails(place) {
    const country = place.address_components.find((component) => {
      return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
    })
    const location = place.geometry.location
    // choices for city name:
    // short: place.name (city name only)
    // medium: this.props.value
    // long: place.formatted_address
    this.props.onChange({
      name: this.props.value.name, // unchanged
      place_id: place.place_id, // unchanged
      country_code: country.short_name,
      lat: location.lat(),
      lng: location.lng(),
      utc_offset: place.utc_offset,
    })
  }

  render() {
    const {value} = this.props

    let searchText = ''
    if (value) {
      if (typeof value === 'string') {
        searchText = value
      } else if (value.name) {
        searchText = value.name
      }
    }

    return (
      <AutoComplete
        ref={this.ref}
        style={styles.field}
        fullWidth={true}
        dataSource={this.state.textPredictions}
        onUpdateInput={this.handleChange}
        onNewRequest={this.handleSelect}
        filter={this.filter}
        searchText={searchText}
        autoComplete="google suggestions typeahead"
        floatingLabelText={<FormattedMessage id={'field.' + this.props.name} />}
        errorText={this.props.touched && this.props.error && <FormattedMessage id={'error.' + this.props.name} />}
        {...this.props}
      />
    )
  }
}

export default CityField
