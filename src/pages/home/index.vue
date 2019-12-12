<template>
  <div class="bgContent">
    <div class="e-box">
      <div class="W90 flex-c" style="margin:0 auto 10px">
        <img src="@/assets/img/logo.png" class="WW100">
      </div>
      <div class="flex-c mb-20 color_99">
        FUSION Wallet
      </div>
      <van-button type="primary" @click="toUrl('/register')">创建钱包</van-button>
      <van-button type="info" @click="toUrl('/login')" class="ml-10">导入钱包</van-button>
      <div class="WW100 mt-30">
        <select class="WW100 input-text H35 font14 bgff" @change="changNet" v-model="netUrl">
          <option value="0">自定义</option>
          <!-- <option value="https://fsn.dev/api">主网</option>
          <option value="https://testnet.fsn.dev/api">测试网</option> -->
          <option value="http://192.168.1.184:6501">主网</option>
          <option value="http://192.168.1.184:8701">测试网</option>
        </select>
      </div>
      <div class="WW100 mt-30" v-if="Number(netUrl) === 0">
        <input type="text" v-model="selfNetVal" class="WW100 input-text H35 font14 bgff" @change="setNet">
      </div>
      <!-- <textarea v-model="address" class="input-text mt-20 WW100"></textarea> -->
    </div>
  </div>
</template>

<style>
.e-box {padding: 25% 0 50px;width: 190px;margin: auto;}
</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      netUrl: this.$$.serverURL,
      isSelfNet: false,
      selfNetVal: ''
      // address: localStorage.getItem('address')
    }
  },
  mounted () {
    // console.log(this.$$.web3.fsntx.buildSendAssetTx({
    //   from: '0xAa5dCD8d7644F9de310211d1211221a2BCF19D9D',
    //   to: '0xE000E632124aa65B80f74E3e4cc06DC761610583',
    //   value: '1000',
    //   asset: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    // }))
    
    // this.$$.web3.fsntx.buildSendAssetTx({
    //   from: '0xAa5dCD8d7644F9de310211d1211221a2BCF19D9D',
    //   to: '0xE000E632124aa65B80f74E3e4cc06DC761610583',
    //   value: '1000',
    //   asset: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    // }).then(res => {
    //   console.log(res)
    // })
    this.changNet()
  },
  methods: {
    changNet () {
      console.log(this.netUrl)
      if (Number(this.netUrl) === 0) {
        this.isSelfNet = true
      } else {
        this.isSelfNet = false
        this.setNet()
      }
      // console.log(this.$$.web3)
    },
    setNet () {
      let url = Number(this.netUrl) === 0 ? this.selfNetVal : this.netUrl
      this.$$.web3.setProvider(new this.$$.web3.providers.HttpProvider(this.netUrl))
      if (this.$$.web3.isConnected()) {
        this.$notify({ type: 'success', message: '连接成功！' })
      } else {
        this.$notify('连接失败！')
      }
      localStorage.setItem('network', url)
    }
  }
}
</script>