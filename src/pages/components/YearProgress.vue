<template>
    <div id="progressContainer">
      <progress :percent="percent" active stroke-width="4" activeColor="#EA4951"></progress>
      <p>{{year}}年已经过去{{days}}天,{{percent}}%</p>
    </div>
</template>

<script>
  export default {
    data: {

    },
    methods: {
      isLeapYead(){
        const currentYear = new Date().getFullYear()
        if (currentYear % 400 === 0){
          return true
        }else if (currentYear % 4 === 0 && (!currentYear % 100) !== 0){
          return true
        }else {
          return false
        }
      },
      getDaysOfYear(){
        return this.isLeapYead() ? 366 : 365
      }
    },
    computed:{
      year(){
        return new Date().getFullYear()
      },
      days(){
        let start = new Date()
        start.setMonth(0)
        start.setDate(1)
        //设置后start就表示今年第一天
        let timeOffSet = new Date().getTime() - start.getTime()
        return parseInt(timeOffSet/1000/60/60/24)
      },
      percent(){
        return (this.days * 100 / this.getDaysOfYear()).toFixed(1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #progressContainer
    padding 20rpx
    p
      font-size 36rpx
      margin-top 10rpx
      margin-bottom 40rpx
</style>
