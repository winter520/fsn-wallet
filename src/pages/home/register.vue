<template>
  <div class="bgContent flex-c">
    <div class="form-box HH100 pt-30">
      <ul class="ul" v-if="walletJSON.length <= 0">
        <li class="item">
          <label class="label">密码:</label>
          <div class="input-box">
            <input type="password" v-model="password" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item">
          <van-button type="info" @click="changePwd" class="WW100" :disabled="password.length <= 0">导入</van-button>
        </li>
      </ul>
      <div class="WW100 mt-30" v-if="walletJSON.length > 0">
        <textarea class="input-text WW100 font12" style="height:300px;" v-model="walletJSON" readonly id="copyTxtId"></textarea>
        <van-button type="primary" class="WW100" @click="copyTxt('copyTxtId')">复制</van-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.form-box {
  width: 100%;padding:0 15px;
  .item {
    width: 100%;margin-bottom:20px;
    .label {
      width: 100%;text-align: left;display: block;margin-bottom: 10px;font-size: 14px;font-weight: bold;
    }
    .input-box {
      width: 100%;height: 40px;position: relative;
    }
  }
}
</style>

<script>
export default {
  name: 'register',
  data () {
    return {
      password: '',
      walletJSON: ''
    }
  },
  mounted () {

  },
  methods: {
    changePwd () {
      if (this.password.length < 9) {
        this.$notify('您的密码必须至少9个字符。请确保它是一个强密码。')
      } else {
        let walletInit = this.$$.wallet.generate(this.password)
        let jsonStr = walletInit.toV3(this.password, {
          kdf: "scrypt",
          n: 8192
        })
        this.walletJSON = JSON.stringify(jsonStr)
        this.$notify({ type: 'success', message: '创建成功！' })
      }
    },
    copyTxt (id) {
      document.getElementById(id).select()
      document.execCommand("Copy")
      this.$notify({ type: 'success', message: '复制成功！' })
    }
  }
}
</script>