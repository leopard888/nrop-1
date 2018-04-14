/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index')
const nrop19 = require('./../controllers/nrop19')
const y66t = require('./../controllers/y66t')
const soedivx = require('../controllers/soedivx')

const routers = router
  .get('/nrop19/list', nrop19.listPage)
  .get('/nrop19/:id', nrop19.detailPage)
  .get('/y66t/list', y66t.listPage)
  .get('/y66t/:id', y66t.detailPage)

  .get('/soedivx/list' , soedivx.listPage)
  .get('/soedivx/:id' , soedivx.detailPage)
module.exports = routers
