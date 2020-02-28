<template>
  <div class="footer-box">
    <van-tabbar v-model="nowNav">
      <van-tabbar-item name="1" to="/" icon="home-o">{{$t('nav').assets}}</van-tabbar-item>
      <van-tabbar-item name="2" to="/search" icon="search">{{$t('nav').search}}</van-tabbar-item>
      <van-tabbar-item name="3" to="/person" icon="friends-o">{{$t('nav').my}}</van-tabbar-item>
      <!-- <van-tabbar-item icon="setting-o">标签</van-tabbar-item> -->
    </van-tabbar>
  </div>
</template>

<style lang="scss">
.footer-box {
  .van-tabbar-item {
    color: #838d9a;
  }
  .van-tabbar-item--active {
    color: #edb517;
  }
}
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