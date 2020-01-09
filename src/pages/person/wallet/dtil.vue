<template>
  <div class="boxConntent1">
    <div class="WW100 w-dtil-box">
      <textarea class="input-box" style="height:280px;" v-model="wDtil.ks" readonly id="copyKeystore"></textarea>
      <input type="text" class="input-box" v-model="wDtil.address" readonly id="copyAddress">
      <!-- <div class="input-box">{{wDtil.ks}}</div> -->
      <p class="flex-c font14 color_red mb-20 mt-20">请保存好Keystore，如有遗失将无法找回</p>
      <div>
        <van-button type="primary" @click="copyTxt('copyKeystore')">复制 Keystore</van-button>
        <van-button type="info" @click="copyTxt('copyAddress')" class="ml-15">复制 Address</van-button>
        <van-button type="danger" @click="removeKs" class="ml-15">删除</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.w-dtil-box {
  width: 100%;padding: 15px;
  .input-box {
    width: 100%;word-break: break-all;font-size: 12px;padding: 10px;border:1px solid #ddd;text-align: left;
  }
}
</style>

<script>

export default {
  name: 'walletDtil',
  data () {
    return {
      wDtil: {}
    }
  },
  mounted () {
    // console.log(this.$route)
    this.initData()
  },
  methods: {
    initData () {
      this.wDtil = this.$route.query
      console.log(this.$store.state.keystoreObj)
    },
    removeKs () {
      this.$dialog.confirm({
        title: '删除确认',
        message: '是否删除此账户？' + this.wDtil.address
      }).then(res => {
        console.log(res)
        this.$store.commit('setRemoveKeystore', this.wDtil.address)
        this.$notify({ type: 'success', message: '删除成功！' })
        this.toUrl('/person/wallet')
      }).catch(err => {
        console.log(err)
      })
    },
    copyTxt (id) {
      document.getElementById(id).select()
      document.execCommand("Copy")
      this.$notify({ type: 'success', message: '复制成功！' })
    }
  }
}
</script>