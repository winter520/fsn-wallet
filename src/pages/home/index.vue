<template>
  <div class="bgContent">
    <div class="e-box">
      <div class="W90 flex-c" style="margin:0 auto 30px">
        <img src="@/assets/img/logo/logo1.png" class="WW100">
      </div>
      <!-- <div class="flex-c mb-20 color_99">
        FUSION Wallet
      </div> -->
      <van-button type="primary" @click="toUrl('/register')" class="btn-yellow">创建钱包</van-button>
      <van-button type="info" @click="toUrl('/login')" class="ml-10 btn-radius">导入钱包</van-button>
      <set-node></set-node>
      <!-- <div class="WW100 mt-30">
        <select class="WW100 input-text H35 font14 bgff" @change="changNet" v-model="netUrl">
          <option value="0">自定义</option>
          <option value="https://fsn.dev/api">主网1</option>
          <option value="https://testnet.fsn.dev/api">测试网1</option>
          <option value="http://192.168.1.184:6501">主网2</option>
          <option value="http://192.168.1.184:8701">测试网2</option>
          <option value="https://testnetpublicgateway2.fusionnetwork.io:10000">测试网3</option>
        </select>
      </div>
      <div class="WW100 mt-30" v-if="Number(netUrl) === 0">
        <input type="text" v-model="selfNetVal" class="WW100 input-text H35 font14 bgff" @change="setNet">
      </div> -->
      <!-- <textarea v-model="address" class="input-text mt-20 WW100"></textarea> -->
    </div>
  </div>
</template>

<style>
.e-box {padding: 25% 0 50px;width: 190px;margin: auto;}
</style>

<script>
import setNode from '@c/setNode/index'
export default {
  name: 'home',
  data () {
    let _isSelfNet = Number(localStorage.getItem('isSelfNet'))
    // console.log(_isSelfNet)
    return {
      // netUrl: _isSelfNet ? 0 : this.$$.serverURL,
      // isSelfNet: _isSelfNet,
      // selfNetVal: _isSelfNet ? localStorage.getItem('network') : '',
      // networkArr: []
    }
  },
  components: {setNode},
  mounted () {
    // setTimeout(() => {
    //   this.changNet()
    // }, 200)


  },
  methods: {
    // changNet () {
    //   // console.log(this.netUrl)
    //   if (Number(this.netUrl) === 0) {
    //     this.isSelfNet = true
    //   } else {
    //     this.isSelfNet = false
    //     this.setNet()
    //   }
    // },
    // setNet () {
    //   let url = Number(this.netUrl) === 0 ? this.selfNetVal : this.netUrl
    //   this.$$.web3.setProvider(this.netUrl)
    //   this.$$.isConnected().then(res => {
    //     this.$notify({ type: 'success', message: '连接成功！' })
    //   }).catch(err => {
    //     this.$notify('节点连接失败！')
    //   })
    //   localStorage.setItem('network', url)
    //   let flag = Number(this.netUrl) === 0 ? 1 : 0
    //   localStorage.setItem('isSelfNet', flag)
    // }
  }
}
</script>