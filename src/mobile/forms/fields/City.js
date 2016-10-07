import React, {Component, PropTypes} from 'react'
import {Platform, StyleSheet, View, Text} from 'react-native'
import {injectIntl, intlShape} from 'react-intl'

import MaterialTextField from '../../components/MaterialTextField'
import FormattedMessage from '../../components/FormattedMessage'
import Touchable from '../../components/Touchable'

import {buildQuery} from '../../../common/utils/api'

import config from '../../../common/config'
import colors from '../../../common/constants/colors'

const requestPlace = (service, query) => {
  query.key = Platform.OS === 'ios' ? config.google_ios_key : config.google_android_key

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
    intl: intlShape.isRequired,
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      textPredictions: [],
      predictions: [],
    }
    this.handleChange = this.handleChange.bind(this)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  handleChange(value) {
    this.currentRequest = value
    this.props.input.onChange({
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
        this.props.input.onChange({
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

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  render() {
    const {intl, input: {name, value}, meta: {touched, error}, ...props} = this.props

    return (
      <View style={styles.container}>
        <MaterialTextField ref={this.ref}
          value={(value && value.name) ? value.name : ''}
          label={intl.formatMessage({id: 'field.' + name})}
          isError={Boolean(touched && error)}
          onChangeText={this.handleChange}
          {...props}
        />
        {
          this.state.textPredictions.map((description, index) => (
            <Touchable key={index} onPress={this.handleSelect.bind(this, index)}>
              <Text style={styles.suggestion}>{description}</Text>
            </Touchable>
          ))
        }
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginBottom: 8,
  },
  suggestion: {
    paddingVertical: 6,
    color: colors.main,
    fontSize: 16,
  },
  error: {
    fontSize: 12,
    color: colors.error,
    marginVertical: 8,
  },
})

export default injectIntl(CityField, {withRef: true})
