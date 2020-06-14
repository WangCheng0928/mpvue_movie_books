<template>
  <div>
    <div id="bookContainer">
      <div class="thumb">
        <img :src="book.image" mode="aspectFit" @click="preview">
      </div>
      <div class="detail" @click="bookDetail">
        <div class="left">
          <p>{{book.title}}</p>
          <p>{{book.author}}</p>
          <p>{{book.publisher}}</p>
        </div>
        <div class="right">
          <div class="score">
            <p>{{book.score}}</p>
            <Rate :value="book.score"></Rate>
          </div>
          <p class="price">{{getBookPrice}} 元</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Rate from "./Rate";

  export default {
    props: ['book'],

    components:{
      Rate
    },
    computed: {
      getBookPrice(){
        return (this.book.price).match(/\d+(.\d+)?/g)
      }
    },
    methods: {
      preview() {
        wx.previewImage({
          current: this.book.image,
          urls: [this.book.image]
        })
      },
      bookDetail() {
        wx.navigateTo({
          url: "../bookDetail/main?id=" +  this.book.id
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #bookContainer
    padding 10rpx
    display flex
    flex-direction row
    .thumb
      width 180rpx
      height 180rpx
      img
        width: 100%;
        height 100%
    .detail
      flex-grow 1
      font-size 32rpx
      display flex
      flex-direction row
      justify-content space-between
      .left
        display flex
        flex-direction column
        padding 10rpx
        margin-left 16rpx
        justify-content space-between
      .right
        flex-grow 1
        display flex
        flex-direction column
        padding 8rpx;
        align-items flex-end
        .price
          margin-top 26rpx
        .score
          display flex
          flex-direction row
          p
            margin-right 10rpx
</style>
