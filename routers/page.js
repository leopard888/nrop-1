/**
 * 主页子路由
 */

const router = require('koa-router')()
const index = require('../controllers/index')
const nrop19 = require('./../controllers/nrop19')
const y66t = require('./../controllers/y66t')
const sodeivx = require('../controllers/sodeivx')

const routers = router
  .get('/nrop19/list', nrop19.listPage)
  .get('/nrop19/:id', nrop19.detailPage)
  .get('/y66t/list', y66t.listPage)
  .get('/y66t/:id', y66t.detailPage)

  .get('/sodeivx/list' , sodeivx.listPage)
  .get('/sodeivx/:id' , sodeivx.detailPage)
module.exports = routers
