// ajax 服务路由集合

let KoaRouter = require('koa-router')

// 声明路由实例
const router = new KoaRouter({
  prefix: '/weapp'   // 这里的prefix一定要有前缀 ‘/’ 否则会找不到路由，大坑
})


// 引入服务端
const controllers = require('require-all')({
  dirname: __dirname + '/../controllers',
})

router.get('/', controllers.test)

router.get('/getOpenId', controllers.login)

router.post('/addBook', controllers.addBook)

router.post('/getBookList', controllers.booklist)

router.post('/getBookDetail', controllers.bookdetail)

module.exports = router
