import request from "./request";
let jwt = require('jsonwebtoken')

export default function () {
  return new Promise((resolve, reject) => {
    console.log(333333333)
    wx.login({
      success: async (res)=>{
        let code = res.code
        let ret = await request("/weapp/getOpenId", {code})
        console.log(ret)
        try {
          resolve(ret)
          wx.setStorageSync("openId", ret)
        }catch (e) {
          console.log(e)
          reject(e)
        }
      },
      fail: (res) => {
        console.log(res.errMsg)
        reject(res.errMsg)
      }
    })
  })
}

function get(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      success: (res)  =>  {
        let openid = jwt.sign(res.data.openid, "wangcheng")
        resolve(openid)
      }
    })
  })
}
