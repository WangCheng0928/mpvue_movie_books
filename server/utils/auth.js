let jwt = require('jsonwebtoken')
let config = require('../config')

const AUTH_SUCCESS = {
  code: 0,
  msg: "verify success"
}

module.exports =  (openId) => {
  return new Promise((resolve, reject) => {
    jwt.verify(openId, config.jwtString, function (err, decoded) {
      if (decoded){
        resolve(AUTH_SUCCESS)
      }else {
        reject(err)
      }
    })
  })
}
