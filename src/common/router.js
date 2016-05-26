let router

if (window.location) {
  router = require('../web/router')
} else {
  router = require('../mobile/router')
}

export default router.default
