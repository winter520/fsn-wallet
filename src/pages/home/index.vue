<template>
  <div class="bgContent flex-c">
    <div>
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
          <option value="https://fsn.dev/api">主网</option>
          <option value="https://testnet.fsn.dev/api">测试网</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'home',
  data () {
    return {
      netUrl: this.$$.serverURL
    }
  },
  mounted () {
    // console.log(this.$$)
    
    // this.$$.web3.fsntx.buildSendAssetTx({
    //   from: '0xAa5dCD8d7644F9de310211d1211221a2BCF19D9D',
    //   to: '0xE000E632124aa65B80f74E3e4cc06DC761610583',
    //   value: '1000',
    //   asset: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    // }).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    changNet () {
      this.$$.web3.setProvider(new this.$$.web3.providers.HttpProvider(this.netUrl))
      if (this.$$.web3.isConnected()) {
        this.$notify({ type: 'success', message: '连接成功！' })
      } else {
        this.$notify('连接失败！')
      }
      // console.log(this.$$.web3)
    }
  }
}
</script>