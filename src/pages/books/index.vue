<template>
  <div >
    <div v-if="openid">
      <Card v-if="bookList.length" :key="book.id" v-for="book in bookList" :book="book"></Card>
      <p v-if="more" class="text-footer">没有更多数据了</p>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request";
  import Card from "../components/Card";
  import {showModal} from "../../utils/show";

  export default {

    components: {
      Card
    },

    data: {
      bookList: [],
      page: 0,
      bookNum: 10,
      more: true,
      openid: ''
    },

    methods: {
      async getBookList(init){
        if (init){
          this.page = 0
          this.more = true
        }
        wx.showNavigationBarLoading()
        let openid = wx.getStorageSync("openId")
        let booklist = await request('/weapp/getBookList', {openid, page:this.page, bookNum: this.bookNum}, 'POST')
        if (booklist.length < this.bookNum && this.page > 10){
          this.more = false
        }
        if (init){
          this.bookList = booklist
          wx.stopPullDownRefresh()
        }else {
          this.bookList = this.bookList.concat(booklist)
        }
        for (let book of this.bookList){
          console.log(book.author)
        }
        wx.hideNavigationBarLoading()
      }
    },

    onReachBottom: function () {
      if (! this.more){
        return false
      }
      this.page = this.page + 1
      this.getBookList()
    },

    onPullDownRefresh(){
      this.getBookList(true)
      console.log("下拉")
    },

    mounted() {
      this.getBookList(true)
    },

    onLoad: function () {
      let openid = wx.getStorageSync("openId")
      if (!openid) {
        showModal("您未登录","登录后即有权限查看", function () {
          console.log("我点击确定了444432333")
          wx.reLaunch({
            url: '../personal/main'
          })
        })
      }else {
        this.openid = openid
      }
    },
    onShow: function () {
      let openid = wx.getStorageSync("openId")
      this.openid = openid
      console.log(openid)
      if (!openid) {
        showModal("您未登录","登录后即有权限查看", function () {
          console.log("我点击确定了444432333")
          wx.reLaunch({
            url: '../personal/main'
          })
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
