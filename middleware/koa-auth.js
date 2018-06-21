
const auth = {
  check(ctx, next) {
    if(ctx.session && ctx.session.signin){
      return next()
    }else{
      let last = ctx.href;
    
      ctx.redirect('/signin?rurl='+encodeURIComponent(last))
    }
    
  }
}

module.exports = auth