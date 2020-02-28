<template>
  <div class="bgContent flex-c">
    <div class="form-box HH100 pt-30">
      <ul class="ul" v-if="walletJSON.length <= 0">
        <li class="item">
          <label class="label">{{$t('label').password}}:</label>
          <div class="input-box">
            <input type="password" v-model="password" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item">
          <van-button type="info" @click="changePwd" class="WW100 btn-yellow" :disabled="password.length <= 0">{{$t('btn').createWt}}</van-button>
        </li>
      </ul>
      <div class="WW100 mt-30" v-if="walletJSON.length > 0">
      <!-- <div class="WW100 mt-30"> -->
        <textarea class="input-text WW100 font12" style="height:300px;" v-model="walletJSON" readonly id="copyTxtId"></textarea>
        <p class="flex-c font14 color_red mb-20">{{$t('tip').tip1}}</p>
        <van-button type="primary" class="WW100 btn-yellow" @click="saveKeystoreAndEnter">{{$t('btn').copyAndJoin}}</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// body{
//   background: $bg-black;
// }
</style>

<script>
export default {
  name: 'register',
  data () {
    return {
      password: '',
      walletJSON: '',
      address: ''
    }
  },
  mounted () {
    console.log(localStorage.getItem('keystoreArr'))
  },
  methods: {
    changePwd () {
      if (this.password.length < 9) {
        this.$notify(this.$t('warn').w_8)
      } else {
        let walletInit = this.$$.wallet.generate(this.password)
        let jsonStr = walletInit.toV3(this.password, {
          kdf: "scrypt",
          n: 8192
        })
        this.walletJSON = JSON.stringify(jsonStr)
        this.address = walletInit.getChecksumAddressString()
        this.$notify({ type: 'success', message: this.$t('success').s_5 })
      }
    },
    saveKeystoreAndEnter () {
      this.$store.commit('setAddress', {info: this.address})
      this.$store.commit('setKeystore', {info: this.walletJSON})
      this.$store.commit('setKeystoreObj', {
        key: this.address,
        value: this.walletJSON
      })
      this.toUrl('/')
    },
  }
}
</script>