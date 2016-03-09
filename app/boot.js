// dynamically load polyfills, and load the app when the required ones are loaded:

const NUM_POLYFILLS = 5 // update this number if adding polyfills

let num = 0
const loaded = () => {
  num++
  if (num === NUM_POLYFILLS) {
    require('./index')
  }
}

/*global require:false*/

if (window.fetch) {
  loaded()
} else {
  require.ensure(['isomorphic-fetch'], (require) => {
    require('isomorphic-fetch')
    loaded()
  })
}

if (window.Intl) {
  loaded()
} else {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
    'intl/locale-data/jsonp/fr.js',
  ], (require) => {
    require('intl')
    require('intl/locale-data/jsonp/en.js')
    require('intl/locale-data/jsonp/fr.js')
    loaded()
  })
}

if (Object.assign) {
  loaded()
} else {
  require.ensure(['object.assign'], (require) => {
    require('object.assign').shim()
    loaded()
  })
}

if (Array.prototype.find) {
  loaded()
} else {
  require.ensure(['array.prototype.find'], (require) => {
    require('array.prototype.find').shim()
    loaded()
  })
}

if (Array.prototype.includes) {
  loaded()
} else {
  require.ensure(['array-includes'], (require) => {
    require('array-includes').shim()
    loaded()
  })
}
