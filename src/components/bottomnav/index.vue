<template>
  <div class="">
    <van-tabbar v-model="nowNav">
      <van-tabbar-item name="1" to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="2" icon="search">查找</van-tabbar-item>
      <van-tabbar-item name="3" to="/person" icon="friends-o">我的</van-tabbar-item>
      <!-- <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'bottomNav',
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      nowNav: ''
    }
  },
  mounted () {
    console.log(this.$route)
    this.nowNav = this.active
    // this.changePath()
  },
  methods: {
  }
}
</script>