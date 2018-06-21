const router = require('koa-router')()
const service = require('../controllers/account')

const routers = router.get('/', async(ctx, next) => {
  await ctx.render('signin')
})
.post('/' , service.signinForm)



module.exports = routers