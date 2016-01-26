const API_ENDPOINT = 'http://localhost:3000/'

const get = (route, params) => {
  let arr = []
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      arr.push(key + '=' + encodeURIComponent(params[key]))
    }
  }
  return fetch(API_ENDPOINT + route + '?' + arr.join('&'))
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('HTTP ' + response.status)
      }
      return response.json()
    })
}

export default {
  get,
}
