
const http = require('../utils/http')

const base = require('../utils/base')

const config = require('../config')

const cache = require('../utils/cache')

const iconv = require('iconv-lite')

const host = base.base64_decode(require('../config').host.y66t)

const getRealKtplayerUrl = async (url) =>{
  // http://www.fcw45.com/player/kt_player.js?v=23.9.0
  let code = http.get('http://www.fcw45.com/player/kt_player.js?v=23.9.0')
  let exec_code = code + ';'
}

const getRealUrl = async (url) =>{
  let resp = await http.get(url , {fake : true})

  // kuaibo2.net
  if(resp.indexOf('atob(') >= 0){
    let code = resp.match(/atob\('([^']+)/)[1]
    let script = base.base64_decode(code)
    return (script.match(/src=(http[^'&]+)/) || ['',''])[1]
  }

  //99dd6.com
  else if(resp.indexOf('getEmbed')>=0){
    let url = resp.match(/video_url\s*:\s*['"]([^'"]+)/)[1]
    if(/^http/.test(url) == false){
      return '' //url = url.replace(/[\w\W]+http/,'http')
    }
    // return url
    // return url
    let h = await http.header(url,{followRedirect:false})
    if( h.headers && h.headers.location ){
      return h.headers.location
    }else{
      return url
    }
  }
  //ppptoppp.com
  else if(resp.indexOf('tm-video-play-box')>= 0){
    let url = resp.match(/src='([^'"]+)/)[1]
    return url
  }
  //aotu43.com
  else if(resp.indexOf('video-js')>=0){
    let url = resp.match(/source src="([^'"]+)/)[1]
    return url
  }
  else if(resp.indexOf('Aliplayer')>=0){
    let url = resp.match(/source:"([^'"]+)/)[1]
    return url
  }else{
    return ''
  }

}

const data = {
  async list(page , cate){
    let resp = await http.get(host+'thread0806.php?fid=22&page='+page,{encoding:null})

    resp = iconv.decode(resp, 'gbk').toString()

    let data = []

    resp.split('tr2').pop().replace(/class="tal"[^>]+?>([^<]+?)<h3><a\s+href="([^"]+)[^>]+?>([\w\W]+?)<\/a>/g , ($0 , $1 , $2 , $3) =>{
      
      // let de = $3.split(/[\[\]]/g)
      data.push({
        viewkey : base.base64_encode($2).replace(/\//g,'_'),
        title : ($1+$3),
        thumb:'',
        img:''
      })
      return ''
    })
    
    return data
  },

  async detail(viewkey){
    if(cache[viewkey]){
      return cache[viewkey]
    }

    let url = base.base64_decode(viewkey.replace(/_/g,'/'))
    if( url.indexOf('read.php') >= 0 ){
      let resp = await http.header(host+url,{followRedirect:false})
      url = (resp.body.match(/url=([^"]+?)"/) || ['',''])[1]
    }

    resp = await http.get(host+url , {fake:true})

    url = (resp.match(/getElementById\('iframe1'\)\.src='([^']+?)'/) || ['',''])[1]


    let realurl = await getRealUrl(url)

    let source = url ? [] : [{
      title :'默认',
      url : realurl
    }]

    cache.set(viewkey , {source})

    return {  source  }
  },


}

module.exports = data