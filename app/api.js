/*global __API_ENDPOINT__:false*/

const request = (route, params, method) => {
  let arr = []
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      arr.push(key + '=' + encodeURIComponent(params[key]))
    }
  }
  let url = __API_ENDPOINT__ + '/' + route
  let query = arr.join('&')
  let init = { method, credentials: 'include' }
  if (query) {
    if (method === 'GET') {
      url += '?' + query
    } else {
      init.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      init.body = query
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
  put: (route, params) => request(route, params, 'PUT'),
  delete: (route, params) => request(route, params, 'DELETE'),
}
