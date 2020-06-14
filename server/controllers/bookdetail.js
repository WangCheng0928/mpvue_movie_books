let mysqldb = require('../utils/mysqldb')
let config = require('../config')

module.exports = async (ctx, next) => {
  // 1. 获取请求参数
  let { bookid } = ctx.request.body
  // 2. 根据请求参数请求服务端
  let ret = await mysqldb.findOneById({bookid})
  let bookinfo = JSON.parse(JSON.stringify(ret.results[0]))
  // 3. 作出响应
  ctx.body = bookinfo
}
