<template>
  <div class="">
    <van-nav-bar
      :title="title"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="replay" slot="right" />
    </van-nav-bar>
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
      // this.title = cur.meta.title
      this.setTitle()
    },
    lang () {
      this.setTitle()
    }
  },
  computed: {
    lang () {
      return this.$store.state.language
    }
  },
  mounted () {
    // this.title = this.$route.meta.title
    this.setTitle()
  },
  methods: {
    setTitle () {
      let param = this.$route.meta.lang
      this.title = this.$t('title')[param]
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$emit('on-refresh')
    },
  }
}
</script>