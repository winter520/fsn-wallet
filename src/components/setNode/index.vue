<template>
  <div>
    <div class="WW100 mt-30">
      <select class="WW100 input-text H35 font14 bgff" v-model="netUrl">
        <option value="0">自定义</option>
        <option value="https://fsn.dev/api">主网1</option>
        <option value="https://testnet.fsn.dev/api">测试网1</option>
        <option value="http://192.168.1.184:6501">主网2</option>
        <option value="http://192.168.1.184:8701">测试网2</option>
        <option value="https://testnetpublicgateway2.fusionnetwork.io:10000">测试网3</option>
      </select>
    </div>
    <div class="WW100 mt-10" v-if="Number(netUrl) === 0">
      <input type="text" v-model="selfNetVal" class="WW100 input-text H35 font14 bgff" @change="setNet">
    </div>
    <div class="WW100 mt-10" @click="changNet">
      <van-button type="info" size="small">应用节点</van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  name: 'setnode',
  data () {
    // let _isSelfNet = Number(localStorage.getItem('isSelfNet'))
    return {
      // netUrl: _isSelfNet ? 0 : this.$$.serverURL,
      // isSelfNet: _isSelfNet,
      // selfNetVal: _isSelfNet ? localStorage.getItem('network') : '',
      // networkArr: []
      netUrl: '',
      isSelfNet: '',
      selfNetVal: '',
      networkArr: []
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.changNet()
    // }, 200)
    // console.log(this.netUrl)
    this.initSet()
  },
  methods: {
    initSet () {
      let _isSelfNet = Number(localStorage.getItem('isSelfNet'))
      this.netUrl = _isSelfNet ? 0 : (localStorage.getItem('network') ? localStorage.getItem('network') : this.$$.serverURL)
      this.isSelfNet = _isSelfNet
      this.selfNetVal = _isSelfNet ? localStorage.getItem('network') : ''
    },
    changNet () {
      // console.log(this.netUrl)
      if (Number(this.netUrl) === 0) {
        this.isSelfNet = true
      } else {
        this.isSelfNet = false
        this.setNet()
      }
    },
    setNet () {
      let url = Number(this.netUrl) === 0 ? this.selfNetVal : this.netUrl
      this.$$.web3.setProvider(this.netUrl)
      this.$$.isConnected().then(res => {
        this.$notify({ type: 'success', message: '连接成功！' })
      }).catch(err => {
        this.$notify('节点连接失败！')
      })
      console.log(url)
      localStorage.setItem('network', url)
      let flag = Number(this.netUrl) === 0 ? 1 : 0
      localStorage.setItem('isSelfNet', flag)
    }
  }
}
</script>