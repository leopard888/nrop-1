const service = require('./../models/nrop19')
const base = require('../utils/base')
const request = require('request')
const channals = require('../channals')

const cats = [
  {title:'默认',key:''},
  {title:'当前最热',key:'hot'},
  {title:'最近得分',key:'rp'},
  {title:'10分钟以上',key:'long'},
  {title:'最近加精',key:'rf'},
  {title:'本月最热',key:'top'},
  {title:'本月收藏',key:'tf'},
  {title:'收藏最多',key:'mf'},
  {title:'高清',key:'md'},
]

const channal = 'nrop19'

module.exports = {

  async list(ctx) {
    let result = {
      status: 0,
      data: null,
    }

    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    result.data = data

    result.count = data.length

    ctx.body = result

  },

  async listPage(ctx){
    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    await ctx.render('index',{
      data , page:parseInt(page) , cat , cats , channal , channals
    })
  },

  async detail(ctx){
    let result = {
      status: 0,
      data: null,
    }
    let {id} = ctx.params
    let data = await service.detail(id)
    result.data = data
    ctx.body = result

  },

  async detailPage(ctx){
    let {id} = ctx.params
    let proxy = ctx.query.p == 1
    let index = parseInt(ctx.query.r || '0')

    let data = await service.detail(id)
    let url = index < data.source.length ? data.source[index].url : ''
    if(proxy) url = '/api/proxy/play/' + base.base64_encode(url)
    await ctx.render('detail',{
      data , proxy , index , url
    })

  },


}