import config from "./config";

export default function (url, data={}, method="GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url, //仅为示例，并非真实的接口地址
      data,
      method,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: (res)=> {
        resolve(res.data)
      },
      fail: (error)=> {
        reject(error)
      }
    })
  })
}

