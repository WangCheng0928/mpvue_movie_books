<template>
  <div id="rate">
    <span>☆☆☆☆☆</span>
    <span class="hover" :style="style">★★★★★</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: {type:[Number, String], default: '0'}
    },
    computed:{
      style(){
        return `width: ${this.value/2}em`
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #rate
    position relative
    display inline-block
    .hover
      position absolute
      top 0
      left 0
      overflow hidden
</style>
