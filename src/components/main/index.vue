<template>
  <div class="bgContent" style="padding-top:46px;">
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="刷新"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <transition name="van-fade">
      <router-view v-if="isRefresh"></router-view>
    </transition>
    
    <bottom-nav></bottom-nav>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'bg',
  data () {
    return {
      title: '',
      isRefresh: true
    }
  },
  watch: {
    '$route' (cur) {
      console.log(cur)
      this.title = cur.meta.title
    }
  },
  mounted () {
    console.log(this.$route)
    this.title = this.$route.meta.title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.reload()
    },
    reload () {
      this.isRefresh = false
      this.$nextTick(() => {
        this.isRefresh = true
      })
    }
  }
}
</script>