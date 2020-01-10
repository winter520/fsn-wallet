<template>
  <div class="form-box HH100 pt-30">
    <ul class="ul">
      <li class="item" v-if="keystore">
        <label class="label">密码:</label>
        <div class="input-box">
          <input type="password" v-model="password" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item" v-if="!keystore">
        <label class="label">私钥:</label>
        <div class="input-box">
          <input type="password" v-model="privateKey" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item">
        <van-button type="info" @click="toBackData" class="WW100" :disabled="password.length <= 0 && privateKey.length <= 0">解锁</van-button>
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
      let data = {state: 0, info: ''}
      try {
        if (this.keystore) {
          let walletInfo = this.$$.getWalletFromPrivKeyFile(
            this.keystore,
            this.password
          )
          this.privateKey = walletInfo.getPrivateKeyString()
        }
        let prvtKey = new Buffer(this.$$.fixPkey(this.privateKey), 'hex')
        const wallet = new this.$$.wallet(prvtKey)
        if (this.address.toString() !== wallet.getChecksumAddressString().toString()) {
          data.info = '账户错误！'
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
