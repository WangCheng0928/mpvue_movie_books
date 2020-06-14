let Koa = require("koa")
let koaBody = require('koa-body')
let response = require('./response/response')
// 1. 生成应用及路由器实例
const app = new Koa();

// 2. 使用响应处理中间件
app.use(response)

// 3 .配置koa-body中间件
app.use(koaBody())

// 4. 使用路由器及路由,引发路由转发
const router = require('./routes')
app.use(router.routes())  // 声明使用路由
   .use(router.allowedMethods()) //允许使用的路由方法

// 5. 监听端口
app.listen('3000', ()=>{
  console.log("服务器启动成功")
  console.log("服务器地址：http://localhost:3000")
})
