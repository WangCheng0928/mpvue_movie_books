const config = {
  appId: "wxa812a90d048b7540",
  appSecret: "71a2e2c24ca3674530f4b70c6096530e",
  jwtString: "wangcheng",
  doubanBaseUrl: "https://api.douban.com/v2/book/isbn/",
  apiKey: "0b2bdeda43b5688921839c8ecb20399b",

  mysql:{
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'bookinfo',
    port: 3306,
    multipleStatements: true
  },

  statusCode: {
    CODE_SUCCESS: 0,
    CODE_FAIL: -1,
    CODE_NO_PERMISSION: -2,
  }
}

module.exports = config
