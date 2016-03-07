import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import TextField from 'material-ui/lib/text-field'

import styles from '../../constants/styles'

import scriptLoader from '../../utils/scriptLoader'

/*global google:false*/

class CityField extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.focus = this.focus.bind(this)
  }

  /*eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    scriptLoader.load('https://maps.googleapis.com/maps/api/js?libraries=places&language=' + this.props.lang, () => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById('city'), {types: ['(cities)']})
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (place && place.address_components) {
          const country = place.address_components.find((component) => {
            return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
          })
          if (country) {
            this.props.onChange({
              name: place.name,
              country_code: country.short_name,
              place_id: place.place_id,
            })
            return
          }
        }
        this.props.onChange({}) // reset
      })
    })
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.field.refs.input).focus()
  }

  render() {
    const {onChange, value, ...other} = this.props // removing controlling props

    return (
      <TextField ref="field"
        style={styles.field}
        autoComplete="off"
        placeholder=""
        {...other}
        id="city"
      />
    )
  }

}

CityField.propTypes = {
  lang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.object,
}

export default CityField
