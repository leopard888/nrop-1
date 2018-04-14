/*
 * api 路由
 */
const router = require('koa-router')()

const proxy = require('../controllers/proxy')
const nrop19 = require('../controllers/nrop19')
const y66t = require('../controllers/y66t')
const soedivx = require('../controllers/soedivx')


const routers = router//.prefix('/api')
    // .post('/signin', user.signin)
    // .post('/signup', user.signup)

    .get('/proxy/play/:id' , proxy.play)

    .get('/nrop19/list' , nrop19.list)
    .get('/nrop19/:id' , nrop19.detail)

    .get('/y66t/list' , y66t.list)
    .get('/y66t/:id' , y66t.detail)

    .get('/soedivx/list' , soedivx.list)
    .get('/soedivx/:id' , soedivx.detail)
    
module.exports = routers
