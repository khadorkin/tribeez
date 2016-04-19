import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import AutoComplete from 'material-ui/AutoComplete'

import styles from '../../constants/styles'

import scriptLoader from '../../utils/scriptLoader'

/*global google:false __GOOGLE_API_KEY__:false*/

class CityField extends Component {

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

  /*eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    window.onGooglePlaces = () => {
      this.autocomplete = new google.maps.places.AutocompleteService()
      this.places = new google.maps.places.PlacesService(document.createElement('div'))
    }
    if (window.google) {
      window.onGooglePlaces()
    } else {
      scriptLoader.load('https://maps.googleapis.com/maps/api/js?key=' + __GOOGLE_API_KEY__
                      + '&libraries=places&callback=onGooglePlaces&language=en') // TODO: localized cities?
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
    this.places.getDetails({
      placeId: prediction.place_id,
    }, this.handleDetails)
    // MUI sets this.props.value here?
  }

  handleDetails(place) {
    const country = place.address_components.find((component) => {
      return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
    })
    this.props.onChange({
      name: this.props.value, // could be also place.formatted_address, but place.name does not contain country
      country_code: country.short_name,
      place_id: place.place_id,
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

CityField.propTypes = {
  touched: PropTypes.bool.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any, // because redux-form sets it to a string instead of object
}

export default CityField
