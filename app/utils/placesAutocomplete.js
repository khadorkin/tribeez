import scriptLoader from './scriptLoader'

/*global google:false*/
const mount = (nodeId, onChange, onError, lang = 'en', types = ['(cities)']) => {
  scriptLoader.load('https://maps.googleapis.com/maps/api/js?libraries=places&language=' + lang, () => {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById(nodeId), {types})
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place && place.address_components) {
        const country = place.address_components.find((component) => {
          return (component.types.includes('country') && component.short_name && component.short_name.length === 2)
        })
        if (country) {
          onChange({
            city_name: place.name,
            country_code: country.short_name,
            place_id: place.place_id,
          })
          return
        }
      }
      onError(place)
    })
  })
}

export default mount
