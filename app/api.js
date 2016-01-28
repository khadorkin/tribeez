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
      if (response.status >= 500) {
        throw new Error('Internal Server Error')
      }
      // if status >= 400, the error will be in the returned JSON and is handled by the component
      return response.json()
    })
}

export default {
  get,
}
