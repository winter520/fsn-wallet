<template>
  <div class="">
    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="刷新"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'headerNav',
  data () {
    return {
      title: '',
    }
  },
  watch: {
    '$route' (cur) {
      // console.log(cur)
      this.title = cur.meta.title
    }
  },
  mounted () {
    this.title = this.$route.meta.title
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$emit('on-refresh')
    },
  }
}
</script>