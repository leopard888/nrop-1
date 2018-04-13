
const http = require('../utils/http')
const base = require('../utils/base')
const cache = require('../utils/cache')
const config = require('../config')
const host = base.base64_decode(require('../config').host.sodeivx)

var _cats

const data = {
  async cats(){
    if(_cats) return _cats

    let resp = await http.header(host+'change-country/cn' , {followRedirect : false})
    let cookies = resp.headers['set-cookie'].join('; ')

    resp = await http.get(host , {headers:{'Cookie':cookies}})

    // resp = await http.get(host+'change-country/cn' )
    // console.log(resp.substr(resp.indexOf('data-country'),20))
    let data = []
    resp.replace(/<span[^>]+><\/span>/g,'').replace(/<li class="dyn[^>]+?><a[\w\W]+?href="([^"]+?)"[^>]*?>([^<]+?)<\/a><\/li>/g,($0,$1,$2)=>{
      data.push({
        key : base.base64_encode($1) ,
        title : $2.replace(/^\s*/,'')
      })
      return ''
    })
    return data
  },

  async list(page , cate){
    let url

    cate = base.base64_decode(cate).replace(/^\//,'')
    
    if(/^porn\//.test(cate)){
      url = cate + '/' + page
    }
    else if(/^c\//.test(cate)){
      url = cate.replace('c/','c/'+page+'/')
    }
    else if(/^\?k=/.test(cate)){
      url = cate+'&p='+page
    }
    else{
      url = 'new/' + page
    }
    let resp = await http.get(host+url)
    let data = []
    resp.replace(/<img[\w\W]+?data-src="([^"]+?)"[\w\W]+?<a href="([^"]+?)"\s+title="([^"]+?)"/g , ($0 , $1, $2, $3)=>{
      data.push({
        viewkey : base.base64_encode($2) , 
        thumb : '' ,
        img : $1,
        title : $3
      })
      return ''
    })
    return data
  },

  async detail(viewkey){
    if(cache(viewkey)){
      return cache(viewkey)
    }

    let path = base.base64_decode(viewkey).replace(/^\//,'')

    let resp = await http.get(host+path, {fake:true})
    // console.log(resp)
    let url_low = (resp.match(/setVideoUrlLow\('([^'"]+?)'/) || ['',''])[1]

    let url_high = (resp.match(/setVideoUrlHigh\('([^'"]+?)'/) || ['',''])[1]

    let url_hls = (resp.match(/setVideoHLS\('([^'"]+?)'/) || ['',''])[1]

    let thumb = (resp.match(/setThumbUrl169\('([^'"]+?)'/) || ['',''])[1]

    let thumbslide = (resp.match(/setThumbSlide\('([^'"]+?)'/) || ['',''])[1]

    let title = (resp.match(/setVideoTitle\('([^'"]+?)'/) || ['',''])[1]

    let source = [
      {
        'title':'低画质',
        'url':url_low
      },
      {
        'title':'高画质',
        'url':url_high
      },
      {
        'title':'HLS(iOS)',
        'url' : url_hls
      }
    ];

    cache(viewkey , { title , source,  thumb , thumbslide})

    return { title , source, thumb , thumbslide}
  },


}

module.exports = data