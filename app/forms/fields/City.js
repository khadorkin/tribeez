import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import AutoComplete from 'material-ui/lib/auto-complete'

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
    this.focus = this.focus.bind(this)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.showPredictions = this.showPredictions.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
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

  focus() {
    ReactDOM.findDOMNode(this.refs.field.refs.searchTextField.refs.input).focus()
  }

  filter() {
    return true // we don't want to filter
  }

  handleUpdateInput(input) {
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

  handleNewRequest(value, index) {
    const prediction = this.state.predictions[index]
    this.places.getDetails({
      placeId: prediction.place_id,
    }, this.handleDetails)
  }

  handleDetails(place) {
    const country = place.address_components.find((component) => {
      return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
    })
    this.props.onChange({
      name: this.props.value.name, // could be also place.formatted_address, but place.name does not contain country
      country_code: country.short_name,
      place_id: place.place_id,
    })
  }

  render() {
    const {onChange, value, ...other} = this.props

    return (
      <AutoComplete
        ref="field"
        style={styles.field}
        dataSource={this.state.textPredictions}
        onUpdateInput={this.handleUpdateInput}
        onNewRequest={this.handleNewRequest}
        filter={this.filter}
        searchText={value && value.name}
        autoComplete="google suggestions typeahead"
        {...other}
      />
    )
  }

}

CityField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any, // because redux-form sets it to a string instead of object
}

export default CityField
