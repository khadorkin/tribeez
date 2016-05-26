let routes

if (window.location) {
  routes = require('../web/routes')
} else {
  routes = require('../mobile/routes')
}

export default routes.default
