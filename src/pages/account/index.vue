<template>
  <div class="bgContent">
    <div class="top-box">
      <div class="top-bg">
        <!-- <h5 class="text-l color_ff">FUSION (FSN)</h5> -->
        <!-- <van-icon name="cross" class="close"/> -->
        <span class="close flex-c font12" @click="popup.account = true">
          <!-- <van-icon name="exchange" class="font14" />切换账户 -->
          <van-icon name="exchange" class="font16 color_ff" />
          <!-- <van-icon name="apps-o" class="font18" /> -->
          <!-- <van-icon name="bars" class="font18" /> -->
        </span>
        <div class="top-header">
          <div class="pic flex-c"><img src="@/assets/img/logo/logo0.png" class="WW100"></div>
          <div class="txt font18">{{addrNode ? addrNode : ''}}</div>
          <div class="txt flex-c" @click="qrcode(address)">
            {{$$.cutOut(address, 10, 12)}}
            <van-icon name="qr" class="font16 ml-10"/>
          </div>
          <div class="txt font12 flex-c color_gray">{{network}}</div>
        </div>
      </div>
      
      <div class="top-balance-bg flex-bc">
        <div class="l">FSN {{$t('label').assets}}：</div>
        <div class="r">≈ {{$$.thousandBit(fsnBalance, 8)}}</div>
      </div>
    </div>
    <div>
      <van-tabs v-model="activeName" sticky class="bgContent">
        <van-tab :title="$t('label').balance" name="a">
          <van-list v-model="loading" :finished="finished" :finished-text="$t('tip').noMore" :loading-text="$t('loading').l_1">
            <!-- <van-cell v-for="item in balanceData" :key="item" :title="item"/> -->
            <ul class="list-box">
              <li v-for="(item, index) in balanceData" :key="index" class="item flex-bc" @click="toUrl('/send', {id: item.id, balance: item.balance, type: '0'})">
                <div class="flex-sc">
                  <div class="logo">
                    <img :src="getCoinInfo(formatAddr(item.id)).logo" v-if="getCoinInfo(formatAddr(item.id))">
                    <i class="null flex-c" v-else>0x</i>
                  </div>
                  <span class="label"></span>{{formatAddr(item.id)}}
                </div>
                <div class="WW60">
                  <p class="flex-ec">≈ {{$$.thousandBit($$.web3.utils.fromWei(item.balance.toString(), 'ether'), 'no')}}</p>
                  <p class="flex-ec font12">{{$$.cutOut(item.id, 8, 6)}}</p>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="TimeLock" name="b">
          <van-list v-model="loading" :finished="finished" :finished-text="$t('tip').noMore" :loading-text="$t('loading').l_1">
            <!-- <van-cell v-for="item in balanceData" :key="item" :title="item"/> -->
            <ul class="list-box" v-for="(items, indexs) in timelockData" :key="indexs">
              <div class="flex-sc assets">
                <div class="logo">
                  <img :src="getCoinInfo(formatAddr(items.id)).logo" v-if="getCoinInfo(formatAddr(items.id))">
                  <i class="null flex-c" v-else>0x</i>
                </div>
                <span class="label"></span>{{formatAddr(items.id)}}
              </div>
              <li v-for="(item, index) in items.list" :key="index" class="item" @click="toUrl('/send', {id: items.id, balance: item.Value, StartTime: item.StartTime, EndTime: item.EndTime, type: '1'})">
                <p class="flex-sc">
                  <span class="label">Amount：</span>{{$$.thousandBit($$.web3.utils.fromWei(item.Value.toString(), 'ether'), 'no')}}
                </p>
                <div class="flex-bc">
                  <!-- <p class="WW50 flex-sc"><span class="label">FROM：</span>{{$$.timeChange({date: item.StartTime, type: 'yyyy-mm-dd', format: '-'})}}</p> -->
                  <p class="WW50 flex-sc"><span class="label">From：</span>{{
                    item.StartTime.toString().length > 13 ? 'Forever' : $$.timeChange({date: item.StartTime, type: 'yyyy-mm-dd', format: '-'})
                  }}</p>
                  <p class="WW50 flex-sc"><span class="label">To：</span>{{
                    item.EndTime.toString().length > 13 ? 'Forever' : $$.timeChange({date: item.EndTime, type: 'yyyy-mm-dd', format: '-'})
                  }}</p>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>


    <van-popup v-model="popup.account" close-icon-position="top-left" position="left" :style="{ width: '60%', height: '100%' }" >
      <wallet-account @on-wallet="changeAccount"></wallet-account>
    </van-popup>

    <van-popup v-model="popup.qrcode" :style="{ width: '280px', height: '360px' }" >
      <div class="qrcodeCont_box">
        <div id="qrcode" class="flex-c"></div>
        <div class="qrcodeCont_title flex-c flex-wrap">
          <!-- <h3 class="font12 addr">{{address}}</h3> -->
          <!-- <h3 class="font14">你的地址</h3> -->
          <input type="text" class="input-text H30 WW100 font12 center" v-model="address" readonly id="copyAddress">
          <van-button type="info" size="mini" @click="copyTxt('copyAddress')" class="mt-10 btn-radius plr20 H30 flex-c">{{$t('btn').copy}} Address</van-button>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<style lang="scss">
.top-box {
  width: 100%;padding:0;
  .top-bg {
    width: 100%;height: 180px;padding:15px 15px;background: url('~@/assets/img/bg/topBg.png') no-repeat center; background-size: 100% 100%;position:relative;
    .close {
      position: absolute;top:15px;right: 15px;color:#333;font-size: 14px;
    }
    .top-header {
      width: 100%;
      .pic {
        width: 60px;height: 60px;margin: 20px auto 10px;background: #9b9188;border-radius: 100%;padding: 12px;
      }
      .txt{
        font-size: 14px;line-height: 21px;
      }
    }
    .info {
      .item {
        font-size: 14px;color:#fff;
      }
    }
  }
  .top-balance-bg {
    width: 100%;height: 90px;background: url('~@/assets/img/bg/wave.png') no-repeat center #e8be29; background-size: 100% 100%;padding: 45px 15px 25px;
    .l {
      font-size: 14px;line-height: 20px;
    }
    .r {
      font-size: 18px;font-weight: bold;
    }
  }
}
.list-box {
  width: 100%;padding: 0px 0;
  .assets {
    width: 100%;padding: 10px 15px; background: #eee;
  }
  .logo {
    width: 25px; height: 25px;margin-right: 10px;
    img {
      width: 100%;
    }
    .null {
      width: 100%;height: 100%;border:1px solid #e8be29;border-radius: 100%;font-size: 12px;color: #e8be29;
    }
  }
  .item {
    width: 100%;padding: 8px 15px;border-bottom: 1px solid #ddd;font-size: 14px;
    .label {
      font-weight: bold;
    }
  }
}

.qrcodeCont_box{width: 100%;height: 100%;padding:40px 20px;}
.qrcodeCont_box .addr {word-break: break-all;line-height: 20px;margin-bottom: 10px;}
.qrcodeCont_title{text-align:center;font-size:16px;margin-top:20px;}
</style>

<script>
// const coinInfo = require('@/assets/config/coininfo.json')
import coinInfo from '@/assets/config/coininfo.js'
import walletAccount from '@c/account/index.vue'
export default {
  name: 'account',
  data () {
    return {
      loading: false,
      finished: false,
      activeName: 'a',
      fsnBalance: 0,
      balanceData: [],
      timelockData: [],
      addrNode: 0,
      fsnId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      network: localStorage.getItem('network'),
      popup: {
        account: false,
        qrcode: false
      }
    }
  },
  components: {walletAccount},
  watch: {
    address () {
      this.initData()
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
    // console.log(coinInfo)
    // console.log(this.$$.web3)
    this.$$.isConnected().then(res => {
      this.initData()
    }).catch(err => {
      this.$notify(this.$t('error').e_1)
    })
  },
  methods: {
    copyTxt (id) {
      document.getElementById(id).select()
      document.execCommand("Copy")
      this.$notify({ type: 'success', message: this.$t('success').s_3 })
    },
    changeAccount (data) {
      this.$store.commit('setKeystore', {info: data.ks})
      this.$store.commit('setAddress', {info: data.address})
      this.initData()
      this.popup.account = false
    },
    initData () {
      const batch = new this.$$.web3.BatchRequest()

      batch.add(this.$$.web3.fsn.getAllBalances.request( this.address, 'latest', (err, res) => {
        this.balanceData = []
        if (err) {
          this.balanceData = [{
            id: this.fsnId,
            balance: 0
          }]
          this.fsnBalance = 0
        } else {
          // this.balanceData = res
          let fsnObj = {
            id: this.fsnId,
            balance: 0
          }
          for (let obj in res) {
            if (obj === this.fsnId) {
              fsnObj = {
                id: obj,
                balance: res[obj]
              }
            } else {
              this.balanceData.push({
                id: obj,
                balance: res[obj]
              })
            }
          }
          // console.log(fsnObj)
          // console.log(this.balanceData)
          this.balanceData.unshift(fsnObj)
          this.fsnBalance = this.$$.web3.utils.fromWei(res[this.fsnId], 'ether')
        }
      }))
      batch.add(this.$$.web3.fsn.getAllTimeLockBalances.request(this.address, 'latest', (err, res) => {
        this.timelockData = []
        if (err) {
          console.log(err)
          this.timelockData = []
        } else {
          let fsnObj = {
            id: this.fsnId,
            balance: 0
          }
          for (let obj in res) {
            if (obj === this.fsnId) {
              fsnObj = {
                id: obj,
                list: res[obj].Items
              }
            } else {
              this.timelockData.push({
                id: obj,
                list: res[obj].Items
              })
            }
          }
          this.timelockData.unshift(fsnObj)
          console.log(this.timelockData)
          // this.timelockData = res
          // this.timelockData = this.timelockData[this.fsnId] && this.timelockData[this.fsnId].Items ? this.timelockData[this.fsnId].Items : []
        }
      }))
      batch.add(this.$$.web3.fsn.getNotation.request(this.address, 'latest', (err, res) => {
        if (err) {
          console.log(err)
          this.addrNode = ''
        } else {
          this.addrNode = res
        }
        this.loading = true
        this.finished = true
      }))

      batch.execute()
    },
    formatAddr (addr) {
      let name = ''
      if (addr === this.fsnId) {
        name = 'FSN'
      } else if (addr === '0xf4798cc45b0fe0c6a27255745f6977166619bf9615d5d25a0f086e6fb24756aa') {
        name = 'Vote1'
      } else {
        name = addr
      }
      return name
    },
    getCoinInfo (coin) {
      if (typeof coinInfo[coin] !== 'undefined') {
        return coinInfo[coin]
      }
      return ''
    },
    qrcode (cont) {
      this.popup.qrcode = true
			this.$nextTick(() => {
        this.$$.qrCode(cont, "qrcode")
			})
    },
  }
}
</script>