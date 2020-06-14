let jwt = require('jsonwebtoken')

module.exports = (openId) => {
  return new Promise((resolve, reject) => {
    let ret = jwt.decode(openId)
    let openid = ret.openId
    if (openid){
      resolve(openid)
    }else {
      reject({code: -1, msg: "解码失败"})
    }
  })
}
