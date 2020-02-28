<template>
  <div>
    <van-cell center>
      <span slot="title" class="flex-sc color_99">
        {{$t('label').Language}} (中 / EN)
      </span>
      <van-switch v-model="lang" slot="right-icon" size="24" active-color="#e9bf29" @change="changeLeng"/>
    </van-cell>
    
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'set',
  data () {
    return {
      lang: false
    }
  },
  mounted () {
    this.lang = this.$i18n.locale === 'zh-CN' ? true : false
  },
  methods: {
    changeLeng () {
      if (this.lang) {
        this.$i18n.locale = 'zh-CN'
      } else {
        this.$i18n.locale = 'en-US'
      }
      this.$store.commit('setLanguage', {info: this.$i18n.locale})
    }
  }
}
</script>