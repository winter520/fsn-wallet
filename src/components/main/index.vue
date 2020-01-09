<template>
  <div class="bgContent" :style="(showHdOrBtn == 1 || showHdOrBtn == 2 ? 'padding-top:46px;' : '') + (showHdOrBtn == 1 || showHdOrBtn == 3 ? 'padding-bottom:50px;' : '')">
    <header-nav @on-refresh="reload" v-if="showHdOrBtn == 1 || showHdOrBtn == 2"></header-nav>

    <transition name="van-fade">
      <router-view v-if="isRefresh"></router-view>
    </transition>
    
    <footer-nav v-if="showHdOrBtn == 1 || showHdOrBtn == 3"></footer-nav>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'bg',
  data () {
    return {
      isRefresh: true,
      showHdOrBtn: 1
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
    reload () {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    },
    changePath () {
      console.log(this.$route)
      let showHdOrBtn = this.$route.meta.showHdOrBtn
      console.log(Number(showHdOrBtn))
      this.showHdOrBtn = Number(showHdOrBtn)
    }
  }
}
</script>