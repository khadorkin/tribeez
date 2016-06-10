import config from '../config'

// when the API is HTTPS but the App is HTTP, redirect to the HTTPS version of the App:
if (config.api_endpoint.indexOf('https') === 0 && window.location && location.protocol !== 'https:') {
  location.protocol = 'https:' // changing the protocol acts as a redirect
}

export const buildQuery = (params) => {
  const arr = []
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      arr.push(`${key}=${encodeURIComponent(params[key])}`)
    }
  }
  return '?' + arr.join('&')
}

const request = (route, params, method) => {
  let url = `${config.api_endpoint}/${route}`
  const init = {method, credentials: 'include'}
  if (method === 'GET') {
    url += buildQuery(params)
  } else {
    init.headers = {
      'Content-Type': 'application/json',
    }
    init.body = JSON.stringify(params)
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
