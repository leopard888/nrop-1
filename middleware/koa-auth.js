const config = require('../config')

const auth = {
  check(ctx, next) {
    if(config.auth === false || (ctx.session && ctx.session.signin)){
      return next()
    }else{
      let last = ctx.href;
    
      ctx.redirect('/signin?rurl='+encodeURIComponent(last))
    }
    
  }
}

module.exports = auth