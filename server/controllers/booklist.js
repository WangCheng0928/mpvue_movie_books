let mysqldb = require('../utils/mysqldb')
let verifyToken = require('../utils/auth')
let config = require('../config')
let jwtdecode = require('../utils/jwtdecode')

module.exports = async (ctx, next) => {
  // 1. 获取请求体参数
  let { openid, page, bookNum } = ctx.request.body
  let offset = page * bookNum
  // 2.验证登录状态
  let ret = await verifyToken(openid)
  openid = await jwtdecode(openid)
  // 3. 发起请求
  if (ret.code === config.statusCode.CODE_SUCCESS){
    let result = await mysqldb.findAllByOpenId({openid, offset, bookNum})
    // 4.作出响应
    if (result.code === config.statusCode.CODE_SUCCESS){
      ctx.body = result.results
    }else {
      ctx.state = {
        code: config.statusCode.CODE_FAIL,
        data: {
          msg: "查询失败"
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
