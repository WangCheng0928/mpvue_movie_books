<template>
  <div id="personalContainer">
    <img class="logout" v-show="userInfo.nickName" src="/static/svg/logout.svg" alt="注销矢量图" @click="logout"/>
    <div class="header">
      <img class="avatar" :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/images/user.png'" alt="用户头像" />
      <button class="btn_login" open-type="getUserInfo" @getuserinfo="handleGetUserInfo" :disabled="userInfo.nickName?true:false">{{userInfo.nickName?userInfo.nickName: '登录'}}</button>   <!-- 这里会button 小程序默认为块级元素，本来button是hang -->
      <YearProgress></YearProgress>
      <button class="btn_scanBook" v-if="userInfo.nickName" @click="scanBook">录入图书</button>
    </div>
  </div>
</template>

<script>
  import YearProgress from "../components/YearProgress";
  import request from "../../utils/request";
  import {showModal} from "../../utils/show";
  import getOpenid from "../../utils/getOpenid";

  export default {
    components: {
      YearProgress
    },

    data: {
      userInfo: {},
      bookIsbn: ""
    },
    created() {
      console.log("个人中心created")
    },
    methods:{
      async handleGetUserInfo(res) {
        if (res.mp.detail.userInfo){
          this.userInfo = res.mp.detail.userInfo
          let openid = await getOpenid()
          this.userInfo.openid = openid
        }else {
          console.log(res.mp.detail.errMsg)
        }
      },

      async addBook(ISBN){
        let openId = wx.getStorageSync("openId")
        let result = await request("/weapp/addBook", {
          isbn: ISBN,
          openid: openId
        },"POST")
        console.log(result)
        if (result.code === 0){
          showModal("添加成功", `${result.data.title}图书添加成功`)
        }else {
          showModal("添加失败",`${result.data.msg}`)
        }
      },
      scanBook(){
        wx.scanCode({
          success: async (res) => {
            if (res.result){
              this.addBook(res.result)
            }
          }
        })
      },
      logout(){
        this.userInfo = {}
        try {
          wx.clearStorageSync()
          this.isLogout = true
        } catch(e) {
          // Do something when catch error
          console.log("清楚缓存失败")
        }
      }
    },
    mounted() {
      if (wx.getStorageSync('openId')) {
        wx.getUserInfo({ //调用前需要用户授权，由于点击登录button后，重新刷新后，信息会丢失，因此重新刷新后调用此方法获取用户信息
          success: async (res)=>{
            this.userInfo = res.userInfo
            this.isLogout = false
            if (wx.getStorageSync('openId')){
              console.log('openId已存在！')
            }else {
              let openid = await getOpenid()
              this.userInfo.openid = openid
              console.log(4444,this.userInfo)
            }
          },
          fail: (res)=>{
            console.log(res.errMsg)
          }
        })
      }else {
      }
    },
    onShareAppMessage: (res)=> {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '蜗牛图书',
        path: '/pages/personal/main',
        imageUrl: '/static/images/user.png'
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #personalContainer
    padding 0 30rpx
    font-family Arial
    .logout
      width 70rpx
      height 70rpx
      margin-top 66rpx
      margin-left 590rpx
    .header
      text-align center
      padding 20rpx
      margin-top 15rpx
      .avatar
        width 150rpx
        height 150rpx
        border-radius 50%
        margin 20rpx
      .btn_login
        margin-bottom 10rpx
        height 50rpx
        line-height 50rpx
        background #EA5149
        font-size 30rpx
        max-width 160rpx
        color white
      .btn_scanBook
        height 60rpx
        margin-top 30rpx
        line-height 60rpx  // 当height == line-height时， 文字就会垂直居中
        background #EA5149
        font-size 35rpx
</style>
