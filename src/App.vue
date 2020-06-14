<template>
  <div>

  </div>
</template>

<script>
  import request from "./utils/request";
  export default {
    created (){
      console.log("小程序开始启动")
    },
    mounted() {
      console.log("小程序启动完成")
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .text-footer
    text-align center
    font-size 24rpx
</style>
