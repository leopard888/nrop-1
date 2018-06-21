const router = require('koa-router')()

const home = require('./home')

const signin = require('./signin')

const page = require('./page')

const api = require('./api')

const authorize = require('../middleware/koa-auth').check

router.use('/signin',signin.routes(),signin.allowedMethods())

router.use('/page',authorize, page.routes(), page.allowedMethods())

router.use('/api',authorize, api.routes(), api.allowedMethods())

router.use('/' ,authorize, home.routes(), home.allowedMethods())

module.exports = router
