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
  name: 'footerNav',
  data () {
    return {
      nowNav: ''
    }
  },
  watch: {
    '$route' (cur) {
      this.changePath()
    }
  },
  mounted () {
    this.changePath()
  },
  methods: {
    changePath () {
      // console.log(this.$route)
      let navCur = this.$route.meta.navBtmCur
      this.nowNav = navCur
    }
  }
}
</script>