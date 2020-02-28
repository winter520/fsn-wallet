<template>
  <div class="boxConntent1">
    <van-notice-bar
      :text="$t('tip').tip1"
      left-icon="warn-o"
    />
    <div class="WW100 w-dtil-box">
      <textarea class="input-box" style="height:280px;" v-model="wDtil.ks" readonly id="copyKeystore"></textarea>
      <input type="text" class="input-box" v-model="wDtil.address" readonly id="copyAddress">
      <!-- <div class="input-box">{{wDtil.ks}}</div> -->
      <!-- <p class="flex-c font14 color_red mb-20 mt-20">请保存好Keystore，如有遗失将无法找回</p> -->
      <div class="mt-20">
        <van-button type="primary" @click="copyTxt('copyKeystore')" class="btn-radius">{{$t('btn').copy}} Keystore</van-button>
        <van-button type="info" @click="copyTxt('copyAddress')" class="ml-10 btn-radius">{{$t('btn').copy}} Address</van-button>
        <van-button type="danger" @click="prop.pwd = true" class="ml-10 btn-radius plr30">{{$t('btn').del}}</van-button>
      </div>
    </div>

    <van-popup v-model="prop.pwd" position="bottom">
      <unlock :keystore="wDtil.ks" :address="wDtil.address" @setPrviKey="removeKs"></unlock>
    </van-popup>
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
      wDtil: {},
      prop: {
        pwd: false
      },
      password: ''
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
    removeKs (data) {
      this.prop.pwd = false
      if (data.state) {
        this.$dialog.confirm({
          title: this.$t('warn').w_9,
          message: this.$t('warn').w_10 + this.wDtil.address
        }).then(res => {
          console.log(res)
          this.$store.commit('setRemoveKeystore', this.wDtil.address)
          this.$notify({ type: 'success', message: this.$t('success').s_2 })
          this.toUrl('/person/wallet')
        }).catch(err => {
          console.log(err)
        })
      } else {
        this.$notify(data.info)
      }
    },
    copyTxt (id) {
      document.getElementById(id).select()
      document.execCommand("Copy")
      this.$notify({ type: 'success', message: this.$t('success').s_3 })
    }
  }
}
</script>