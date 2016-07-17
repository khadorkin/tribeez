import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, TextInput} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'

import {buildQuery} from '../../../common/utils/api'

import config from '../../../common/config'
import colors from '../../../common/constants/colors'

const requestPlace = (service, query) => {
  query.key = config.google_android_key
  const url = 'https://maps.googleapis.com/maps/api/place/' + service + '/json' + buildQuery(query)
  return fetch(url, {method: 'GET'})
    .then((response) => {
      if (response.status >= 500) {
        throw new Error('Internal Server Error')
      }
      return response.json()
    })
    .then((response) => {
      if (response.status === 'OK') {
        response.query = query
        return response
      }
      throw new Error('Google API error:' + (response.error_message || response.status))
    })
    .catch(() => {
      return {
        query,
      }
    })
}

class CityField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.state = {
      textPredictions: [],
      predictions: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(value) {
    this.currentRequest = value
    this.props.onChange({
      name: value,
    })
    if (value) {
      requestPlace('autocomplete', {input: value, types: '(cities)'})
        .then((response) => {
          if (this.currentRequest !== response.query.input) {
            return
          }
          const predictions = response.predictions || []
          this.setState({
            textPredictions: predictions.map((prediction) => prediction.description),
            predictions,
          })
        })
    } else {
      this.setState({
        textPredictions: [],
        predictions: [],
      })
    }
  }

  handleSelect(index) {
    const prediction = this.state.predictions[index]
    requestPlace('details', {placeid: prediction.place_id})
      .then((response) => {
        const place = response.result
        if (!place) {
          return //TODO: show an error?
        }
        const country = place.address_components.find((component) => {
          return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
        })
        const location = place.geometry.location
        // choices for city name:
        // short: place.name (city name only)
        // medium: this.props.value
        // long: place.formatted_address
        this.props.onChange({
          name: prediction.description,
          place_id: place.place_id,
          country_code: country.short_name,
          lat: location.lat,
          lng: location.lng,
          utc_offset: place.utc_offset,
        })
        this.setState({
          textPredictions: [],
          predictions: [],
        })
      })
  }

  render() {
    const {name, value, touched, error, ...props} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          underlineColorAndroid={colors.underline}
          {...props}
          value={(value && value.name) ? value.name : ''}
          onChange={null}
          onChangeText={this.handleChange}
          style={styles.field}
        />
        <View style={styles.suggestions}>
          {
            this.state.textPredictions.map((description, index) => (
              <Touchable key={index} onPress={this.handleSelect.bind(this, index)}>
                <Text style={styles.suggestion}>{description}</Text>
              </Touchable>
            ))
          }
        </View>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginHorizontal: 5,
  },
  field: {
    height: 39,
  },
  suggestions: {
    marginHorizontal: 5,
  },
  suggestion: {
    paddingVertical: 5,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default CityField
