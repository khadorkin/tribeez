const API_ENDPOINT = 'http://localhost:3000/'

const request = (route, params, method) => {
  let arr = []
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      arr.push(key + '=' + encodeURIComponent(params[key]))
    }
  }
  let url = API_ENDPOINT + route
  let query = arr.join('&')
  let init = { method, credentials: 'include' }
  if (query) {
    if (method === 'POST') {
      init.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      init.body = query
    } else {
      url += '?' + query
    }
  }
  return fetch(url, init)
    .then((response) => {
      if (response.status >= 500) {
        throw new Error('Internal Server Error')
      }
      // if status >= 400, the error will be in the returned JSON and is handled by the component
      return response.json()
    })
}

export default {
  get: (route, params) => request(route, params, 'GET'),
  post: (route, params) => request(route, params, 'POST'),
}
