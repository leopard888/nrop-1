var _cache = {}

module.exports = (key , ...rest)=>{
  if(rest.length){
    _cache[key] = rest[0]
  }else{
    return _cache[key]
  }
}