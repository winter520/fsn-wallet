<template>
  <div>
    <div class="form-box HH100 pt-30">
      <div class="font12 color_red">
        <!-- Sending Native FSN to ERC-20 FSN Exchanges will result in permanent loss. Check here for the latest status on which exchanges have made the switch to Native FSN before sending. -->
        将本地FSN发送到ERC-20 FSN交换将导致永久性损失。在发送之前，请检查Exchange已切换到本机FSN的最新状态。
      </div>
      <ul class="ul">
        <li class="item">
          <label class="label">发送地址:</label>
          <div class="input-box">
            <input type="text" v-model="formData.to" class="input-text HH100 WW100 font14">
          </div>
          <span class="flex-sc font12 color_99">余额：{{$$.web3.fromWei(balance, 'ether')}}</span>
        </li>
        <!-- <li class="item">
          <label class="label">YOU SEND:</label>
          <div class="input-box">
            <input type="text" v-model="formData.id" class="input-text HH100 WW100 font12" disabled>
          </div>
        </li> -->
        <li class="item">
          <label class="label">发送数量:</label>
          <div class="input-box">
            <input type="number" v-model="formData.value" class="input-text HH100 WW100">
          </div>
        </li>
        <!-- <li class="item">
          <label class="label">时间锁:</label>
          <div class="WW100">
            <van-tabs v-model="activeName" sticky class="bgContent" @click="tabChangeTime">
              <van-tab title="无" name="a">
              </van-tab>
              <van-tab title="时间段" name="b">
                <div class="flex-bc H40 mt-30">
                  从
                  <input type="text" v-model="formData.startTime" @click="prop.startTime = true; formTimeKey = 'startTime'" placeholder="选择开始时间" class="input-text HH100 WW45 font14 center" readonly>
                  到
                  <input type="text" v-model="formData.endTime" @click="prop.endTime = true; formTimeKey = 'endTime'" placeholder="选择截止时间" class="input-text HH100 WW45 font14 center" readonly>
                </div>
              </van-tab>
              <van-tab title="永远" name="c">
                <div class="flex-bc H40 mt-30">
                  从
                  <input type="text" v-model="formData.beginTime" @click="prop.beginTime = true; formTimeKey = 'beginTime'" placeholder="选择开始时间" class="input-text HH100 WW45 font14 center" readonly>
                  到
                  <input type="text" placeholder="选择截止时间" value="永远" class="input-text HH100 WW45 font14 center" readonly>
                </div>
              </van-tab>
            </van-tabs>
          </div>
        </li> -->
        <li class="item mt-30">
          <van-button type="info" @click="openPwd" class="WW100" :disabled="false">发送</van-button>
        </li>
      </ul>
    </div>
    <van-popup v-model="prop.startTime" position="bottom">
      <van-datetime-picker type="date" @confirm="changeTime" @cancel="prop.startTime = false" :min-date="nowDate"/>
    </van-popup>
    <van-popup v-model="prop.endTime" position="bottom">
      <van-datetime-picker type="date" @confirm="changeTime" @cancel="prop.endTime = false" :min-date="new Date(formData.startTime)"/>
    </van-popup>
    <van-popup v-model="prop.beginTime" position="bottom">
      <van-datetime-picker type="date" @confirm="changeTime" @cancel="prop.beginTime = false" :min-date="nowDate"/>
    </van-popup>

    <van-popup v-model="prop.pwd" position="bottom">
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
            <van-button type="info" @click="toSign" class="WW100" :disabled="password.length <= 0 && privateKey.length <= 0">解锁</van-button>
          </li>
        </ul>
      </div>
    </van-popup>

    <van-popup v-model="prop.confirm" :close-on-click-overlay="false">
      <div class="confirm-box">
        <h3>发送确认</h3>
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
        </ul>
        <div class="mt-30">
          <van-button type="info" @click="sendTxns" class="WW30">发送</van-button>
          <van-button @click="cancel" class="WW30 ml-20">取消</van-button>
        </div>
      </div>
    </van-popup>
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
// import Tx from 'ethereumjs-tx'
// let Tx = require('ethereumjs-tx')
// console.log(Tx)
export default {
  name: 'send',
  data () {
    return {
      activeName: 'a',
      formData: {},
      balance: 0,
      formTimeKey: '',
      nowDate: new Date(),
      prop: {
        startTime: false,
        endTime: false,
        beginTime: false,
        pwd: false,
        confirm: false
      },
      privateKey: '',
      password: '',
      signTx: ''
    }
  },
  computed: {
    address () {
      return this.$store.state.address
    },
    keystore () {
      return this.$store.state.keystore
    }
  },
  mounted () {
    this.formData.id = this.$route.query.id
    setTimeout(() => {
      this.balance = this.$$.web3.fsn.getBalance('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', this.address, 'latest')
      // console.log(this.$$.web3.fsn.getBalance('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', this.address, 'latest'))
    }, 200)

    // console.log(this.$$.web3.fsntx.buildSendAssetTx({
    //   from: this.address,
    //   to: '0xc1117600747c820751476c4d2ec78cca9bbebf6d',
    //   value: '10',
    //   asset: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    // }))
    // console.log(this.$$.web3.fsn.getNotation("0x89fa3626bd0ae6e86d558a866f6044790ace8fd2", 'latest'))
    // console.log(this.$$.web3.fsn.getNotation(this.address, 'latest'))
    // console.log(this.$$.web3.isConnected())
  },
  methods: {
    cancel () {
      // this.formData = {}
      this.prop.confirm = false
      this.prop.pwd = false
      this.prop.beginTime = false
      this.prop.endTime = false
      this.prop.startTime = false
      this.signTx = ''
      this.password = ''
      this.privateKey = ''
    },
    tabChangeTime (val) {
      // console.log(val)
      console.log(this.activeName)
    },
    changeTime (val) {
      let timestamp = Date.parse(val)
      this.formData[this.formTimeKey] = this.$$.timeChange({date: timestamp, type: 'yyyy-mm-dd', format: '-'})
      this.prop[this.formTimeKey] = false
      if (this.formTimeKey === 'startTime') {
        this.formData.endTime = ''
      }
    },
    getBaseData () {
      return new Promise((resolve, reject) => {
        let web3 = this.$$.web3
        let batch = web3.createBatch()
        batch.add(web3.eth.getGasPrice.request())
        batch.add(web3.eth.estimateGas.request({to: this.formData.to, data: this.formData.id}))
        batch.add(web3.eth.getTransactionCount.request(this.address, 'pending'))
        batch.requestManager.sendBatch(batch.requests, (err, res) => {
          if (err) {
            reject(err)
          } else {
            let data = {}
            if (res[0].result || res[0].result === 0) {
              data.gasPrice = parseInt(res[0].result)
            } else {
              reject(res[0].error.message)
            }
            if (res[1].result || res[1].result === 0) {
              data.gasLimit = parseInt(res[1].result)
            } else {
              data.gasLimit = parseInt(21000)
            }
            if (res[2].result || res[2].result === 0) {
              data.nonce = parseInt(res[2].result)
            } else {
              reject(res[2].error.message)
            }
            resolve(data)
          }
        })
      })
    },
    openPwd () {
      this.formData.to = this.formData.to.replace(/\s/, '')
      if (!this.$$.web3.isAddress(this.formData.to)) {
        this.$notify('地址不正确')
        return
      }
      if (!this.formData.to) {
        this.$notify('地址不能为空')
        return
      }
      if (!this.formData.value || Number(this.formData.value) === 0) {
        this.$notify('数量不能为空')
        return
      }
      this.prop.pwd = true
    },
    toSign () {
      // console.log(this.$$.getCookie('keystore'))
      let fileData = this.keystore
      if (!fileData && !this.privateKey) {
        this.$notify('登陆超时请重新登陆！')
        return
      }
      try {
        let prvtKey
        let walletInfo
        if (fileData) {
          walletInfo = this.$$.wallet.getWalletFromPrivKeyFile(
            fileData,
            this.password
          )
          prvtKey = walletInfo.getPrivateKeyString()
          prvtKey = new Buffer(this.$$.fixPkey(prvtKey), 'hex')
        } else {
          prvtKey = new Buffer(this.$$.fixPkey(this.privateKey), 'hex')
          walletInfo = new this.$$.wallet(prvtKey)
        }
        if (this.address.toString() !== walletInfo.getChecksumAddressString().toString()) {
          this.$notify('账户错误！')
          return
        }
        this.getBaseData().then(res => {
          // console.log(res)
          let rawTx = res
          rawTx.from = this.address
          rawTx.to = this.formData.to.replace(/\s/, '')
          rawTx.value = this.$$.web3.toWei(this.formData.value, 'ether')
          // rawTx.value = '0x' + this.formData.value.toString('hex')
          rawTx.value = Number(rawTx.value)
          console.log(rawTx)
          let Tx = require('ethereumjs-tx')
          let tx = new Tx(rawTx)
          tx.sign(prvtKey)
          this.signTx = tx.serialize().toString("hex")
          this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
          this.prop.confirm = true
          // console.log(this.signTx)
        }).catch(err => {
          console.log(err)
          this.$notify(err.toString())
        })
      } catch (error) {
        console.log(error)
      }
    },
    sendTxns () {
      this.$$.web3.eth.sendRawTransaction(this.signTx, (err, hash) => {
        if (err) {
          this.$notify(err.toString())
        } else {
          this.$notify({ type: 'success', message: '发送成功！Hash:' + hash })
        }
        this.cancel()
      })
    }
    // assetToTimeLock () {
    //   this.$$.web3.fsn.assetToTimeLock(
    //     this.formData.id,
    //     this.address,
    //     this.formData.to,
    //     this.formData.id,
    //     this.formData.id,
    //     this.formData.id,
    //   )
    // },
    // timeLockToTimeLock () {

    // },
    // timeLockToAsset () {

    // },
  }
}
</script>