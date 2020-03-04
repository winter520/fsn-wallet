<template>
  <div>
    <div class="form-box HH100 pt-30">
      <!-- <div class="font12 color_red">
        将本地FSN发送到ERC-20 FSN交换将导致永久性损失。在发送之前，请检查Exchange已切换到本机FSN的最新状态。
      </div> -->
      <ul class="ul">
        <li class="item">
          <label class="label">{{$t('label').address}}:</label>
          <div class="input-box relative">
            <input type="text" v-model="formData.to" class="input-text HH100 WW100 pr-40" :disabled="isToAsset && sendType === '1' && activeName === 'a'">
            <div class="down-arrow flex-c" @click="isToAsset && sendType === '1' ? '' : prop.address = true"><van-icon name="location-o" /></div>
          </div>
          <!-- <span class="flex-sc font12 color_99">{{$t('label').balance}}：{{balance}}</span> -->
        </li>
        <!-- <li class="item">
          <label class="label">YOU SEND:</label>
          <div class="input-box">
            <input type="text" v-model="formData.id" class="input-text HH100 WW100 font12" disabled>
          </div>
        </li> -->
        <li class="item">
          <label class="label">{{$t('label').value}}:</label>
          <div class="input-box">
            <input type="number" v-model="formData.value" class="input-text HH100 WW100">
          </div>
          <span class="flex-sc font12 color_99">{{$t('label').balance}}：{{balance}}</span>
        </li>
        <li class="item">
          <label class="label">{{$t('label').timelock}}:</label>
          <div class="WW100">
            <van-tabs v-model="activeName" sticky class="bgContent" @click="onTabClick">
              <!-- <van-tab :title="$t('label').null" name="a" v-if="sendType === '0'"> -->
              <van-tab :title="!isToAsset && sendType === '0' ? $t('label').null : 'To Assets'" name="a" :disabled="!isToAsset && sendType === '1'">
              </van-tab>
              <van-tab :title="$t('label').timelock" name="b">
                <div class="WW100" v-if="sendType === '0'">
                  <van-cell center>
                    <span slot="title" class="flex-sc color_99">
                      {{$t('label').advance}}
                    </span>
                    <van-switch v-model="selectTimeType" slot="right-icon" size="24" active-color="#e9bf29" @change="changeLevel"/>
                  </van-cell>
                </div>
                <div class="flex-bc H40 mt-20" v-if="selectTimeType">

                  <input type="text" v-model="formData.startTime" @click="prop.startTime = true; formTimeKey = 'startTime'" :placeholder="$t('label').startTime" class="input-text HH100 WW45 font12 center" readonly>

                  <input type="text" v-model="formData.endTime" @click="prop.endTime = true; formTimeKey = 'endTime'" :placeholder="$t('label').endTime" class="input-text HH100 WW45 font12 center" readonly>
                </div>
                <div class="WW100 flex-bc H40 mt-20" v-else>
                  <input type="text" v-model="formData.month" @click="prop.month = true; formTimeKey = 'month'" :placeholder="$t('label').selectTime" class="input-text HH100 WW80 font12 center" readonly>
                  <p class="flex-c ml-10 font14" style="white-space:nowrap;">{{$t('label').months}}</p>
                </div>
              </van-tab>
              <van-tab :title="$t('label').forever" name="c" v-if="sendType === '0' || urlParams.EndTime.toString().length > 13">
              <!-- <van-tab :title="$t('label').forever" name="c" v-if="sendType === '0'"> -->
                <div class="flex-bc H40 mt-20 WW100">
                  <input type="text" v-model="formData.beginTime" @click="prop.beginTime = true; formTimeKey = 'beginTime'" :placeholder="$t('label').startTime" class="input-text HH100 WW45 font12 center" readonly>
                  <input type="text" :value="$t('label').forever" class="input-text HH100 WW45 font12 center" readonly>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </li>
        <li class="item mt-30">
          <van-button type="info" @click="openPwd" class="WW100 btn-yellow" :disabled="false">{{$t('btn').send}}</van-button>
        </li>
      </ul>
    </div>
    <!-- 时间段 start -->
    <van-popup v-model="prop.startTime" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="changeTime"
        @cancel="prop.startTime = false"
        :min-date="minDate"
        :confirm-button-text="$t('btn').confirm"
        :cancel-button-text="$t('btn').cancel"
      />
    </van-popup>
    <van-popup v-model="prop.endTime" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="changeTime"
        @cancel="prop.endTime = false"
        :min-date="minDate"
        :max-date="maxDate"
        :confirm-button-text="$t('btn').confirm"
        :cancel-button-text="$t('btn').cancel"
      />
    </van-popup>
    <!-- 时间段 end -->

    <!-- 选择月份 start -->
    <van-popup v-model="prop.month" position="bottom">
      <van-picker 
        :columns="['1','2','3','4','5','6','7','8','9','10','11','12']"
        :default-index="2"
        show-toolbar
        :confirm-button-text="$t('btn').confirm"
        :cancel-button-text="$t('btn').cancel"
        @confirm="confirmMonth"
        @cancel="cancel"
      />
    </van-popup>
    <!-- 选择月份 end -->

    <!-- 永远 start -->
    <van-popup v-model="prop.beginTime" position="bottom">
      <van-datetime-picker
        type="date"
        @confirm="changeTime"
        @cancel="prop.beginTime = false"
        :min-date="minDate"
        :confirm-button-text="$t('btn').confirm"
        :cancel-button-text="$t('btn').cancel"
      />
    </van-popup>
    <!-- 永远 end -->

    <!-- 签名 start -->
    <van-popup v-model="prop.pwd" position="bottom">
      <unlock v-if="prop.pwd" :keystore="keystore" :address="address" @setPrviKey="toSign"></unlock>
    </van-popup>
    <!-- 签名 end -->

    <!-- 发送确认 start -->
    <van-popup v-model="prop.confirm" :close-on-click-overlay="false" position="bottom">
      <div class="confirm-box">
        <h3>{{$t('label').send}}</h3>
        <ul class="ul">
          <li class="item">
            <p>From:</p> <p>{{address}}</p>
          </li>
          <li class="item">
            <p>To:</p> <p>{{formData.to}}</p>
          </li>
          <li class="item">
            <p>Value:</p> <p>{{formData.value}}</p>
          </li>
          <li class="item">
            <p>MaxFee:</p> <p>{{maxFee}}</p>
          </li>
        </ul>
        <div class="mt-30">
          <van-button type="info" @click="sendTxns" class="WW30 btn-yellow">{{$t('btn').send}}</van-button>
          <van-button @click="cancel" class="WW30 ml-20 btn-radius">{{$t('btn').cancel}}</van-button>
        </div>
      </div>
    </van-popup>
    <!-- 发送确认 end -->

    <!-- 选择地址 start -->
    <van-popup v-model="prop.address" position="bottom">
      <div class="confirm-box">
        <ul class="ul">
          <li class="item" v-for="(item, index) in addrList" :key="index" @click="selectAddr(index)">
            <p>{{item}}:</p> <p>{{index}}</p>
          </li>
          <li class="mt-15 font14 flex-c"  @click="toUrl('/person/address/add')">
            <van-icon name="add-o" class="mr-10" />
            {{$t('btn').newAdd}}
          </li>
        </ul>
      </div>
    </van-popup>
    <!-- 选择地址 end -->
  </div>
</template>

<style lang="scss">
.down-arrow {
  width: 40px;height: 40px;position: absolute;top:0;right:0;border-left: 1px solid #ddd;
}
.confirm-box {
  padding: 15px 15px;
  .ul {
    .item {
      text-align: left;font-size: 14px;border-bottom: 1px solid #ddd;margin-bottom: 10px;
    }
  }
}

</style>

<script>
let Tx = require('ethereumjs-tx')
export default {
  name: 'send',
  data () {
    return {
      activeName: 'a',
      sendType: '0',
      selectTimeType: false,
      formData: {
        month: 3
        // to: '0x014DC8Fd1221AA87C800A2fF8dB60130b333D410',
        // value: 0.1
      },
      balance: 0,
      formTimeKey: '',
      minDate: new Date(),
      maxDate: new Date('3333-12-30'),
      prop: {
        startTime: false,
        endTime: false,
        beginTime: false,
        pwd: false,
        confirm: false,
        address: false,
        month: false
      },
      privateKey: '',
      password: '',
      signTx: '',
      assetId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      chainId: this.$$.web3.utils.toHex('46688'),
      urlParams: '',
      maxFee: 0,
      isToAsset: false
    }
  },
  computed: {
    address () {
      return this.$store.state.address
    },
    keystore () {
      return this.$store.state.keystore
    },
    addrList () {
      // console.log(this.$store.state.addressObj)
      return this.$store.state.addressObj
    }
  },
  mounted () {
    this.urlParams = this.$route.query
    this.assetId = this.urlParams.id
    this.balance = this.$$.web3.utils.fromWei(this.urlParams.balance, 'ether')
    this.sendType = this.urlParams.type
    if (this.sendType === '1') {
      this.selectTimeType = true
      // this.activeName = 'b'
      this.minDate = new Date(Number(this.urlParams.StartTime) * 1000)
      this.maxDate = new Date(Number(this.urlParams.EndTime) * 1000)
      this.formData.endTime = this.$$.timeChange({
        date: this.urlParams.EndTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      this.formData.beginTime = this.formData.startTime = this.$$.timeChange({
        date: this.urlParams.StartTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      if (this.urlParams.EndTime.toString().length > 13) {
        this.formData.endTime = ''
        this.maxDate = new Date('3333-12-30')
        if (Number(this.urlParams.StartTime) * 1000 < Date.now()) {
          this.isToAsset = true
          this.formData.to = this.address
        } else  {
          this.activeName = 'b'
        }
      }

      // console.log(this.formData)
      console.log(this.activeName)
      // this.formData.endTime = new Date(this.urlParams.EndTime)
    }
    let nodeUrl = localStorage.getItem('network')
    if ( nodeUrl === 'https://testnet.fsn.dev/api') {
      this.chainId = this.$$.web3.utils.toHex('46688')
    } else {
      this.chainId = this.$$.web3.utils.toHex('32659')
    }
    // console.log(this.maxDate)
    // console.log(this.urlParams.type)
    // this.$$.isConnected().then(res => {
    //   this.$$.web3.fsn.getBalance(this.assetId, this.address, 'latest').then(res => {
    //     this.balance = this.$$.web3.utils.fromWei(res, 'ether')
    //   })
    // }).catch(err => {
    //   this.$notify('节点连接失败！')
    // })
  },
  methods: {
    onTabClick () {
      if (this.isToAsset && this.activeName === 'a' && this.sendType === '1') {
        this.formData.to = this.address
      } else if (this.isToAsset &&  this.sendType === '1') {
        this.formData.to = ''
      }
    },
    cancel () {
      // this.formData = {}
      this.prop.confirm = false
      this.prop.pwd = false
      this.prop.beginTime = false
      this.prop.endTime = false
      this.prop.startTime = false
      this.prop.month = false
      this.signTx = ''
      this.password = ''
      this.privateKey = ''
    },
    selectAddr (addr) {
      this.formData.to = addr
      this.prop.address = false
    },
    confirmMonth (val) {
      console.log(val)
      this.formData.month = val
      this.prop.month = false
    },
    changeLevel () {
      console.log(this.selectTimeType)
      if (this.selectTimeType) {
        this.cancel()
        this.formData.month = ''
      } else {
        this.formData.startTime = this.formData.endTime = ''
      }
    },
    changeTime (val) {
      let timestamp = Date.parse(val)
      this.formData[this.formTimeKey] = this.$$.timeChange({date: timestamp, type: 'yyyy-mm-dd', format: '-'})
      this.prop[this.formTimeKey] = false
      if (this.formTimeKey === 'startTime') {
        this.formData.endTime = ''
      }
    },
    openPwd () {
      if (!this.$$.web3.utils.isAddress(this.formData.to)) {
        this.$notify(this.$t('warn').w_1)
        return
      }
      if (!this.formData.to) {
        this.$notify(this.$t('warn').w_2)
        return
      }
      if (!this.formData.value || Number(this.formData.value) === 0) {
        this.$notify(this.$t('warn').w_3)
        return
      }
      if (this.activeName === 'b') {
        if (this.selectTimeType) {
          if (!this.formData.startTime || !this.formData.endTime) {
          // if (!this.formData.startTime) {
            this.$notify(this.$t('warn').w_4)
            return
          }
        } else {
          if (!this.formData.month) {
            this.$notify(this.$t('warn').w_5)
            return
          }
        }
      }
      if (this.activeName === 'c' && !this.formData.beginTime) {
        this.$notify(this.$t('warn').w_6)
        return
      }
      this.formData.to = this.formData.to.replace(/\s/, '')
      this.prop.pwd = true
    },
    toSign (data) {
      // console.log(data)
      // console.log(data)
      // console.log(this.privateKey)
      // let fileData = this.keystore
      // if (!fileData && !this.privateKey) {
      //   this.$notify(this.$t('warn').w_7)
      //   return
      // }
      if (data.state) {
        if (this.sendType === '0') {
          if (this.activeName === 'a') {
            this.AssetToAssetSign(data.info)
          } else if (this.activeName === 'b') {
            this.AssetToTimeLockSign(data.info)
          } else {
            this.AssetToTimeLockSign(data.info, 'Forever')
          }
        } else {
          if (this.activeName === 'a') {
            this.TimeLockToAssetSign(data.info)
          } else if (this.activeName === 'b') {
            this.TimeLockToTimeLockSign(data.info)
          } else {
            this.TimeLockToTimeLockSign(data.info, 'Forever')
          }
        }
      } else {
        this.$notify(data.info)
      }
    },
    AssetToAssetSign (pwd) {
      this.buildTxnsAndSign(pwd, 'buildAssetToTimeLockTx')
      // let rawTx = {
      //   from: this.address,
      //   to: this.formData.to.replace(/\s/, ''),
      //   value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
      //   asset: this.assetId
      // }
      // this.$$.web3.fsntx.buildSendAssetTx({
      //   ...rawTx,
      // }).then(res => {
      //   this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
      //   this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')

      //   res.chainId = this.chainId
      //   res.from = this.address
      //   console.log(res)
      //   let tx = new Tx(res)
      //   tx.sign(pwd)
      //   this.signTx = tx.serialize().toString("hex")
      //   this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
      //   this.prop.confirm = true
      //   console.log(this.signTx)
      // }).catch(err => {
      //   this.$notify(err.toString())
      // })
    },
    AssetToTimeLockSign (pwd, type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
      } else {
        if (this.selectTimeType) {
          startTime = new Date(this.formData.startTime).getTime()
          endTime = new Date(this.formData.endTime).getTime()
        } else {
          startTime = this.$$.timeChange({date: Date.now(), type: 'yyyy-mm-dd', format: '-'})
          startTime = new Date(startTime).getTime()
          endTime = startTime + (1000 * 60 * 60 * 24 * 30 * Number(this.formData.month))
        }
        endTime = parseInt(endTime / 1000)
        endTime = this.$$.web3.utils.toHex(endTime)
      }

      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      this.buildTxnsAndSign(pwd, 'buildAssetToTimeLockTx', startTime, endTime)
      // console.log(this.formData)
      // let rawTx = {
      //   from: this.address,
      //   to: this.formData.to.replace(/\s/, ''),
      //   value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
      //   start: startTime,
      //   end: endTime,
      //   asset: this.assetId,
      // }
      // console.log(rawTx)
      // this.$$.web3.fsntx.buildAssetToTimeLockTx({
      //   ...rawTx
      // }).then(res => {
      //   this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
      //   this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
      //   res.chainId = this.chainId
      //   res.from = this.address
      //   console.log(res)
      //   let tx = new Tx(res)
      //   tx.sign(pwd)
      //   this.signTx = tx.serialize().toString("hex")
      //   this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
      //   this.prop.confirm = true
      //   console.log(this.signTx)
      // }).catch(err => {
      //   this.$notify(err.toString())
      // })
    },
    TimeLockToTimeLockSign (pwd, type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
      } else {
        startTime = new Date(this.formData.startTime).getTime()
        endTime = new Date(this.formData.endTime).getTime()
        endTime = parseInt(endTime / 1000)
        endTime = this.$$.web3.utils.toHex(endTime)
      }
      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      console.log(startTime)
      this.buildTxnsAndSign(pwd, 'buildTimeLockToTimeLockTx', startTime, endTime)
      // let rawTx = {
      //   from: this.address,
      //   to: this.formData.to.replace(/\s/, ''),
      //   value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
      //   start: startTime,
      //   end: endTime,
      //   asset: this.assetId,
      // }
      // console.log(rawTx)
      // this.$$.web3.fsntx.buildTimeLockToTimeLockTx({
      //   ...rawTx
      // }).then(res => {
      //   this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
      //   this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
      //   res.chainId = this.chainId
      //   res.from = this.address
      //   console.log(res)
      //   let tx = new Tx(res)
      //   tx.sign(pwd)
      //   this.signTx = tx.serialize().toString("hex")
      //   this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
      //   this.prop.confirm = true
      //   console.log(this.signTx)
      // }).catch(err => {
      //   this.$notify(err.toString())
      // })
    },
    TimeLockToAssetSign (pwd) {
      let endTime = '', startTime = ''
      startTime = this.$$.timeChange({date: Date.now(), type: 'yyyy-mm-dd', format: '-'})
      startTime = new Date(startTime).getTime()
      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      endTime = this.$$.web3.utils.toHex('18446744073709551615')
      console.log(startTime)
      this.buildTxnsAndSign(pwd, 'buildTimeLockToAssetTx', startTime, endTime)
      // this.buildTxnsAndSign(pwd, 'timeLockToAsset', startTime, endTime)
      // let rawTx = {
      //   from: this.address,
      //   to: this.formData.to.replace(/\s/, ''),
      //   value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
      //   start: startTime,
      //   end: endTime,
      //   asset: this.assetId,
      // }
      // console.log(rawTx)
      // this.$$.web3.fsntx.buildTimeLockToTimeLockTx({
      //   ...rawTx
      // }).then(res => {
      //   this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
      //   this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
      //   res.chainId = this.chainId
      //   res.from = this.address
      //   console.log(res)
      //   let tx = new Tx(res)
      //   tx.sign(pwd)
      //   this.signTx = tx.serialize().toString("hex")
      //   this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
      //   this.prop.confirm = true
      //   console.log(this.signTx)
      // }).catch(err => {
      //   this.$notify(err.toString())
      // })
    },
    buildTxnsAndSign (pwd, param, startTime, endTime) {
      let rawTx = {
        from: this.address,
        to: this.formData.to.replace(/\s/, ''),
        value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
        asset: this.assetId,
      }
      if (startTime) {
        rawTx.startTime = startTime
      }
      if (endTime) {
        rawTx.endTime = endTime
      }
      console.log(rawTx)
      this.$$.web3.fsntx[param]({
        ...rawTx
      }).then(res => {
        this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
        this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
        res.chainId = this.chainId
        res.from = this.address
        console.log(res)
        let tx = new Tx(res)
        tx.sign(pwd)
        this.signTx = tx.serialize().toString("hex")
        this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
        this.prop.confirm = true
        console.log(this.signTx)
      }).catch(err => {
        this.$notify(err.toString())
      })
    },
    sendTxns () {
      this.$$.web3.eth.sendSignedTransaction(this.signTx, (err, hash) => {
        this.cancel()
        if (err) {
          this.$notify(err.toString())
        } else {
          console.log(hash)
          this.$notify({ type: 'success', message: this.$t('success').s_4 + 'Hash:' + hash })
        }
      })
    }
  }
}
</script>