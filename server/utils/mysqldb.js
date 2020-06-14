let query = require('./query')

// 添加

const add = async (obj) => {
  const {isbn, openid, title, image, alt, publisher, summary, price, score, tags, author} = obj
  const _sql = 'insert into books (isbn, openid, title, image, alt, publisher, summary, price, score, tags, author) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  let ret = await query(_sql, [isbn, openid, title, image, alt, publisher, summary, price, score, tags, author])
  console.log(ret)
  return ret
}
// 删除
const del = async (val) => {
  const {title} = val
  const _sql = "delte from bookinfo where title=?"
  let ret = await query(_sql, [title])
  return ret
}

// 查询 by isbn
const findByIsbn = async (val) => {
  const {isbn} = val
  const _sql = "select * from books where isbn = ?"
  let ret = await query(_sql, isbn)
  return ret
}

// 查询所有列表
const findAllByOpenId = async (val) => {
  const {openid, offset, bookNum} = val
  const _sql = "select * from books where openid = ? limit ?, ?"
  let ret = await query(_sql, [openid, offset, bookNum])
  return ret
}

// 根据 id 查询

const findOneById = async (val) => {
  const {bookid} = val
  const _sql = "select * from books where id = ?"
  let ret = await query(_sql, [bookid])
  return ret
}

module.exports = {
  add,
  del,
  findByIsbn,
  findAllByOpenId,
  findOneById
}
