/*global __API_ENDPOINT__:false*/

// when the API is HTTPS but the App is HTTP, redirect to the HTTPS version of the App:
if (__API_ENDPOINT__.indexOf('https') === 0 && location.protocol !== 'https:') {
  location.protocol = 'https:' // changing the protocol acts as a redirect
}

const request = (route, params, method) => {
  const arr = []
  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== undefined && params[key] !== null) {
      arr.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  }
  let url = `${__API_ENDPOINT__}/${route}`
  const query = arr.join('&')
  const init = {method, credentials: 'include'}
  if (query) {
    if (method === 'GET') {
      url = `${url}?${query}`
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
