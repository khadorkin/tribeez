import React, {Component, PropTypes} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'

import FormattedMessage from './FormattedMessage'

import {buildQuery} from '../../common/utils/api'

import config from '../../common/config'
import colors from '../../common/constants/colors'

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
        return response
      }
      throw new Error('Google API error:' + (response.error_message || response.status))
    })
    .catch((/*err*/) => {
      //console.error(err.toString()) //TODO: handle
    })
}

class CityField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
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
    this.props.onChange({
      name: value,
    })
    if (value) {
      requestPlace('autocomplete', {input: value})
        .then((response) => {
          const predictions = response.predictions
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
    this.setState({
      textPredictions: [],
      predictions: [],
    })
    this.props.onChange({
      name: prediction.description,
      place_id: prediction.place_id,
    })
    requestPlace('details', {placeid: prediction.place_id})
      .then((response) => {
        const place = response.result
        const country = place.address_components.find((component) => {
          return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
        })
        this.props.onChange({
          name: this.props.value.name, // could be also place.formatted_address, but place.name does not contain country
          country_code: country.short_name,
          place_id: place.place_id,
        })
      })
  }

  render() {
    const {name, value, touched, error, ...props} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          {...props}
          value={(value && value.name) ? value.name : ''}
          onChangeText={this.handleChange}
        />
        <View style={styles.suggestions}>
          {
            this.state.textPredictions.map((description, index) => (
              <TouchableOpacity key={index} onPress={this.handleSelect.bind(this, index)}>
                <Text style={styles.suggestion}>{description}</Text>
              </TouchableOpacity>
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
