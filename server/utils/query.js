let mysql = require('mysql')
let config = require('../config')

// // 1.获取mysql连接池
// let pool = mysql.createPool(config.mysql)
// if (pool){
//   console.log("数据库连接成功")
// }else {
//   console.log("连接失败")
// }
//
// // 2. 执行sql语句
// let query = (sql, values) => {
//   return new Promise((resolve, reject) => {
//     pool.getConnection((err, connection)=>{
//       console.log(111111)
//       if (err){
//         reject(err)
//       }else {
//         connection.query(sql, values, (err, rows) => {
//           if (err){
//             console.log(22222)
//             reject(err)
//           }else {
//             console.log(33333)
//             resolve(rows)
//           }
//           connection.end()
//         })
//       }
//     })
//   })
// }


function __connection(){

  var connection = mysql.createConnection({
    host     : config.mysql.host,
    user     : config.mysql.user,
    password : config.mysql.password,
    database : config.mysql.database
  });
  connection.connect();
  return connection;
}

module.exports = function(sql,parmas=null){
  //1.获取数据库连接对象
  var connection=__connection();
  return new Promise(function(resolve,reject){

    //2执行sql语句
    connection.query(sql,parmas, (err, results, fields) => {
      if (err){
        reject({code: -1, msg: "fail", err: err})
      }else {
        resolve({code: 0, msg: "success", results})
      }
    });
    //3关闭连接
    connection.end();
  })
}


// module.exports = {
//   query
// }
