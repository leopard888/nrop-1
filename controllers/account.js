const http = require('../utils/http')
const url = require("url")
const auth = require('../config').auth

module.exports = {
  async signinForm(ctx , next){
    let {username , password} = ctx.request.body
    let result = {
      message: '',
      data: null,
      code:-1,
      status: -1
    }

    if(auth.type == 'local'){
      if(auth.data.username == username && auth.data.password == password){
        result.status = 0
      }else{
        result.message = '账号密码错误'
      }
    }
    else{
      result.message = '无法验证'
    }

    if(result.status == 0){
      let session = ctx.session
      session.signin = true

      let rurl = ctx.request.query.rurl
      if(rurl){
        ctx.redirect(decodeURIComponent(rurl))
      }
      else{
        ctx.redirect('/')
      }
    }else{
      await ctx.render('signin', result)
    }


  }
}