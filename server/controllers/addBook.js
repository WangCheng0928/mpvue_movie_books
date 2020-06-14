let verifyToken = require('../utils/auth')
let config = require('../config')
let axios = require('axios')
let mysqldb = require('../utils/mysqldb')
let jwtdecode = require('../utils/jwtdecode')

module.exports = async (ctx, next) => {
  let {isbn, openid} = ctx.request.body
  let result = await verifyToken(openid)
  openid = await jwtdecode(openid)
  if (result.code === config.statusCode.CODE_SUCCESS){
    let res = await mysqldb.findByIsbn({isbn})
    if (res.code === config.statusCode.CODE_SUCCESS && res.results.length){
      ctx.state = {
        code: config.statusCode.CODE_FAIL,
        data: {
          msg: "图书已存在"
        }
      }
    }else {
      const response = await axios.get(`${config.doubanBaseUrl}${isbn}?apikey=${config.apiKey}`)
      const bookInfo = response.data
      console.log(bookInfo)
      const score = bookInfo.rating.average
      const {title, image, alt, publisher, summary, price} = bookInfo
      const tags = bookInfo.tags.map(v=>{
        return `${v.title} ${v.count}`
      }).join(',')
      const author = (bookInfo.author && bookInfo.author.length)?bookInfo.author.join(','): "无作者"
      console.log(score, title, image, alt, publisher, summary, price, author, tags)
      const obj = {isbn, openid, title, image, alt, publisher, summary, price, score, tags, author}
      let ret = await mysqldb.add(obj)
      if (ret.code === config.statusCode.CODE_SUCCESS){
        ctx.body = {
          code: config.statusCode.CODE_SUCCESS,
          data: obj
        }
      }
    }
  }else {
    ctx.state = {
      code: config.statusCode.CODE_NO_PERMISSION,
      data: {
        msg: "无权限"
      }
    }
  }
}

// let findBookByIsbn = async (ctx, next) => {
//   let {isbn, openid} = ctx.request.body
//   let result = await verifyToken(openid)
//   if (result.code === 0){
//     let ret = await mysqldb.find(isbn)
//     console.log(ret)
//     ctx.body = "临时返回的数据"
//   }
// }

