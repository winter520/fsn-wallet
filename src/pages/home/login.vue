<template>
  <div class="bgContent flex-c">
    <!-- <van-uploader :after-read="afterRead" accept="*"/> -->
    <van-tabs v-model="activeName" sticky class="bgContent" @click="tabChange">
      <van-tab title="Keystore" name="a">
        <div class="form-box HH100 pt-30">
          <ul class="ul">
            <li class="item">
              <label class="label">Keystore:</label>
              <div class="input-box">
                <p class="input-text HH100 WW100 flex-c font14 color_99 plr15"><span id="fileName" class="line-block WW100 ellipsis" :title="fileName">{{fileName}}</span></p>
                <input type="file" @change="fileUpChange" class="fileUpload">
              </div>
            </li>
            <li class="item">
              <label class="label">密码:</label>
              <div class="input-box">
                <input type="password" v-model="password" class="input-text HH100 WW100">
              </div>
            </li>
            <li class="item">
              <van-button type="info" @click="inputFile" class="WW100" :disabled="!showPwd || password.length <= 0">导入</van-button>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="私钥" name="b">
        <div class="form-box HH100 pt-30">
          <ul class="ul">
            <li class="item">
              <label class="label">私钥:</label>
              <div class="input-box">
                <input type="password" v-model="privateKey" class="input-text HH100 WW100">
              </div>
            </li>
            <li class="item">
              <van-button type="info" @click="inputPrivateKey" class="WW100" :disabled="privateKey.length <= 0">导入</van-button>
            </li>
          </ul>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss">

</style>

<script>
export default {
  name: 'login',
  data () {
    return {
      activeName: 'a',
      fileData: '',
      password: '',
      privateKey: '',
      showPwd: false,
      fileName: '请上传Keystore'
    }
  },
  mounted () {

  },
  methods: {
    tabChange () {
      this.fileData = ''
      this.password = ''
      this.privateKey = ''
      this.showPwd = false
      this.fileName = '请上传Keystore'
    },
    fileUpChange (event) {
      let reader = new FileReader()
      this.password = ""
      let fileName = event.target.files[0].name
      reader.onload = onLoadEvent => {
        this.fileData = onLoadEvent.currentTarget.result
        this.showPwd = this.$$.walletRequirePass(this.fileData)
        if (this.showPwd) {
          this.fileName = fileName
        } else {
          this.fileName = '请上传Keystore'
        }
      }
      reader.readAsText(event.target.files[0])
      this.password = ''
    },
    inputFile () {
      let walletInfo = this.$$.getWalletFromPrivKeyFile(
        this.fileData,
        this.password
      )
      // console.log(walletInfo.getPrivateKeyString())
      // console.log(walletInfo.getChecksumAddressString())
      this.$store.commit('setKeystore', {info: this.fileData})
      this.inputEnd(walletInfo)
    },
    inputPrivateKey () {
      let walletInfo = new this.$$.wallet(new Buffer(this.$$.fixPkey(this.privateKey), "hex"))
      this.inputEnd(walletInfo)
      // console.log(walletInfo.toJSON())
    },
    inputEnd (walletInfo) {
      this.$store.commit('setAddress', {info: walletInfo.getChecksumAddressString()})
      let address = walletInfo.getChecksumAddressString()
      let ksObj = this.$store.state.keystoreObj
      if (!ksObj[address]) {
        this.$store.commit('setKeystoreObj', {
          key: address,
          value: this.fileData ? this.fileData : 0
        })
      }
      this.toUrl('/')
    }
  }
}
</script>