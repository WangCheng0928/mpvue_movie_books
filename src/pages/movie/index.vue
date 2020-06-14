<template>
  <div id="movieContainer">
    <swiper indicator-dots="{indicatorDots}" indicator-color="pink" indicator-active-color="green">
      <swiper-item>
        <img src="/static/hui/1.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/hui/2.jpg" alt="">
      </swiper-item>
      <swiper-item>
        <img src="/static/hui/3.jpg" alt="">
      </swiper-item>
    </swiper>
    <div class="bookList" >
      <div class="listNav">
        <spam>全部图书</spam>
        <span class="more"> > </span>
      </div>
      <div class="bookItems">
        <div class="item">
          <img src="/static/hui/1.jpg" alt="">
          <p>作者：</p>
          <p>出版社：</p>
        </div>
        <div class="item">
          <img src="/static/hui/2.jpg" alt="">
          <p>作者：</p>
          <p>出版社：</p>
        </div>
        <div class="item">
          <img src="/static/hui/3.jpg" alt="">
          <p>作者：</p>
          <p>出版社：</p>
        </div>
        <div class="item">
          <img src="/static/hui/4.jpg" alt="">
          <p>作者：</p>
          <p>出版社：</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import request from "../../utils/request";
  export default {
    data: {
      indicatorDots: true
    },
    methods: {
    },
    mounted() {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #movieContainer
    swiper
      width 100%
      height 400rpx
      img
        width: 100%
        height 100%
    .bookList
      .listNav
        padding 10rpx
        .more
          float right
      .bookItems
        display flex
        flex-wrap wrap
        .item
          display flex
          width 50%
          flex-direction column
          align-items center
          border-bottom 1rpx solid #eee
          box-sizing border-box  //计算宽高时会把边框和padding计算进去
          &:nth-child(2n+1)
            border-right 1rpx solid #eee
          img
            width 200rpx
            height 200rpx
          p
            font-size 30rpx
            line-height 45rpx
</style>
