let config = require("../config")
let jwt = require('jsonwebtoken')
let Fly = require("flyio/src/node")
let fly = new Fly

module.exports = async (ctx, next) => {
  let code = ctx.query.code
  let appId = config.appId
  let appSecret = config.appSecret
  console.log("server:", code, appId, appSecret)
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  let result = await fly.get(url)
  let userInfo = JSON.parse(result.data)  // JSON.parse里的只能是字符串
  let openId = userInfo.openid
  console.log(userInfo)
  console.log(openId)
  let retOpenId = jwt.sign({openId}, config.jwtString)
  ctx.body = retOpenId
}


