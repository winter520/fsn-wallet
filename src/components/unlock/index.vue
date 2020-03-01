<template>
  <div class="form-box HH100 pt-30">
    <ul class="ul">
      <li class="item" v-if="keystore">
        <label class="label">{{$t('label').password}}:<span class="font12 color_99" style="font-weight:normal;">({{address}})</span></label>
        <div class="input-box">
          <input type="password" v-model="password" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item" v-if="!keystore">
        <label class="label">{{$t('label').privateKey}}:<span class="font12 color_99" style="font-weight:normal;">({{address}})</span></label>
        <div class="input-box">
          <input type="password" v-model="privateKey" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item">
        <van-button type="info" @click="toBackData" class="WW100 btn-yellow" :disabled="password.length <= 0 && privateKey.length <= 0">{{$t('btn').unlock}}</van-button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
// 
</style>

<script>
export default {
  name: 'unlock',
  props: {
    keystore: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      password: '',
      privateKey: ''
    }
  },
  mounted () {

  },
  methods: {
    toBackData () {
      if (!this.keystore && !this.privateKey) {
        this.$notify(this.$t('warn').w_7)
        return
      }
      let data = {state: 0, info: ''}
      try {
        if (this.keystore) {
          let walletInfo = this.$$.getWalletFromPrivKeyFile(
            this.keystore,
            this.password
          )
          this.privateKey = walletInfo.getPrivateKeyString()
        }
        console.log(this.privateKey)
        let prvtKey = new Buffer(this.$$.fixPkey(this.privateKey), 'hex')
        console.log(this.privateKey)
        console.log(prvtKey)
        const wallet = new this.$$.wallet(prvtKey)
        console.log(123)
        if (this.address.toString() !== wallet.getChecksumAddressString().toString()) {
          data.info = this.$t('error').e_2
        } else {
          data.state = 1
          data.info = prvtKey
        }
        this.$emit('setPrviKey', data)
        this.privateKey = ''
        this.password = ''
        prvtKey = ''
      } catch (err) {
        console.log(err)
        data.info = err.toString()
        this.$emit('setPrviKey', data)
        this.privateKey = ''
        this.password = ''
      }
    }
  }
}
</script>
