<template>
  <div>
    <BookInfo v-if="bookinfo" :key="bookinfo.id" :bookinfo = "bookinfo"></BookInfo>
  </div>
</template>

<script>
  import request from "../../utils/request";
  import BookInfo from "../components/BookInfo";

  export default {

    components: {
      BookInfo
    },

    data: {
      bookid: '',
      bookinfo: {}
    },
    methods: {
      async getBookDetailById(){
        let bookinfo = await request("/weapp/getBookDetail", {bookid:this.bookid}, "POST")
        this.bookinfo = bookinfo
        this.bookinfo.tags = this.bookinfo.tags.split(',')
        this.bookinfo.summary = this.bookinfo.summary.split(/\r?\n/)   // 记住  props的值只能在父组件中改，不要在子组件中改props的值，会出现问题
      }
    },
    onLoad() { // 这里在onLoad加载 而不是mounted加载的原因是 保证切换到另一本书不会先还是上本书的页面
      wx.setNavigationBarTitle({
        title: "图书详情"
      })
      this.bookid = this.$root.$mp.query.id
      console.log(this.bookid)
      this.getBookDetailById()
    },
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        console.log(res.target)
      }else {
        return {
          title: this.bookinfo.title,
          path: '@/pages/bookDetail/main'
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
