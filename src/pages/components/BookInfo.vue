<template>
  <div id="imageContainer" v-if="bookinfo.title">
    <div class="thumb">
      <img class="back" :src="bookinfo.image" mode="aspectFill">
      <img class="img" :src="bookinfo.image" mode="aspectFit">
      <div class="info">
        <div class="title">
          <p>{{bookinfo.title}}</p>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="authorAndScore">
        {{bookinfo.author}}
        <div class="score" text-primary>
          {{bookinfo.score}} 分
          <Rate :value="bookinfo.score"></Rate>
        </div>
      </div>
      <div class="publisherAndPrice">
        <p>{{bookinfo.publisher}}</p>
        <p>{{bookinfo.price}}</p>
      </div>
    </div>
    <div class="tags">
      <div class="badge" :key="index" v-for="(tag, index) in bookinfo.tags">{{tag}}</div>
    </div>
    <div class="summary">
      <p :key='index' v-for='(sum,index) in bookinfo.summary'>{{sum}}</p>
    </div>
  </div>
</template>

<script>
  import Rate from "./Rate";
  export default {
    props: ["bookinfo"],
    components: {
      Rate
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #imageContainer
    font-size 30rpx
    padding 10rpx
    .badge
      display inline-block
      margin 10rpx
      padding 10rpx
      border-radius 20rpx
      border 2rpx solid #EA4951
      color #EA4951
      font-size 26rpx
    .summary
      margin-top 15rpx
      text-indent 2em
      padding 0 16rpx
    .thumb
      width 100%
      height 420rpx
      overflow hidden
      position relative
      .back
        filter blur(15px)
        width 100%
      .img
        position absolute
        width 100%
        height 300rpx
        left 0
        top 30rpx
      .info
        color salmon
        position absolute
        width 100%
        left 0
        top 330rpx
        .title
          width 100%
          font-size 36rpx
          margin-top 15rpx
          text-align center
    .detail
      padding 10rpx 20rpx
      .authorAndScore
        .score
          float right
      .publisherAndPrice
        display flex
        flex-direction row
        justify-content space-between
        margin-top 6rpx
</style>
