const base = require('../utils/base')
const request = require('request')
const http = require('../utils/http')

module.exports = {

  async play(ctx){
    let url = base.base64_decode(ctx.params.id.replace(/_/g,'/'))

    try{
      let resp = await http.header(url)
      let headers = resp.headers
      // console.log(resp.headers)
      if(headers){
        for(let i in headers){
          ctx.response.set(i, headers[i])
        }
      }
    }catch(e){

    }
    

    ctx.body = ctx.req.pipe(request(url))

  }
}