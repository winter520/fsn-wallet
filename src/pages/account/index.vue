<template>
  <div class="bgContent">
    <div class="top-box">
      <div class="top-bg">
        <h5 class="text-l color_ff">FUSION (FSN)</h5>
        <!-- <van-icon name="cross" class="close"/> -->
        <span class="close" @click="close">退出</span>
        <div class="info">
          <ul class="flex-bc flex-wrap">
            <li class="WW50 item flex-sc">
              <span>短账号：</span>
              <span>{{addrNode ? addrNode : '无'}}</span>
            </li>
            <li class="WW50 item flex-sc">
              <span>余额：</span>
              <!-- <span>{{$$.thousandBit($$.web3.utils.fromWei(fsnBalance, 'ether'), 8)}}</span> -->
              <!-- <span>{{$$.web3.utils.fromWei(fsnBalance, 'ether')}}</span> -->
              <span>{{$$.thousandBit(fsnBalance, 8)}}</span>
            </li>
            <li class="WW100 item flex-sc font12">
              <span>地址：</span>
              <span>{{address}}</span>
            </li>
            <li class="WW100 item flex-sc font12">
              <span>节点：</span>
              <span>{{network}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div>
      <van-tabs v-model="activeName" sticky class="bgContent">
        <van-tab title="余额" name="a">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
            <!-- <van-cell v-for="item in balanceData" :key="item" :title="item"/> -->
            <ul class="list-box">
              <li v-for="(item, index) in balanceData" :key="index" class="item" @click="toUrl('/send', {id: index, balance: item})">
                <p class="flex-sc">
                  <span class="label">资产名：</span>{{formatAddr(index)}}
                </p>
                <div class="flex-bc">
                  <p class="WW50 flex-sc"><span class="label">ID：</span>{{$$.cutOut(index, 8, 6)}}</p>
                  <p class="WW50 flex-sc"><span class="label">余额：</span>{{$$.thousandBit($$.web3.utils.fromWei(item.toString(), 'ether'), 3)}}</p>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
        <van-tab title="TimeLock" name="b">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
            <!-- <van-cell v-for="item in balanceData" :key="item" :title="item"/> -->
            <ul class="list-box">
              <li v-for="(item, index) in timelockData" :key="index" class="item">
                <p class="flex-sc">
                  <span class="label">AMOUNT：</span>{{$$.thousandBit($$.web3.utils.fromWei(item.Value.toString(), 'ether'), 3)}}
                </p>
                <div class="flex-bc">
                  <p class="WW50 flex-sc"><span class="label">FROM：</span>{{$$.timeChange({date: item.StartTime, type: 'yyyy-mm-dd', format: '-'})}}</p>
                  <p class="WW50 flex-sc"><span class="label">TO：</span>{{
                    item.EndTime.toString().length > 13 ? 'Forever' : $$.timeChange({date: item.EndTime, type: 'yyyy-mm-dd', format: '-'})
                  }}</p>
                </div>
              </li>
            </ul>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <bottom-nav active="1"></bottom-nav>
  </div>
</template>

<style lang="scss">
.top-box {
  width: 100%;padding:10px 15px;
  .top-bg {
    width: 100%;padding:15px 15px;background: #0099ff;border-radius: 5px;position:relative;
    .close {
      position: absolute;top:15px;right: 15px;color:#fff;font-size: 14px;
    }
    .info {
      .item {
        font-size: 14px;color:#fff;
      }
    }
  }
}
.list-box {
  width: 100%;padding: 0px 0;
  .item {
    width: 100%;padding: 8px 15px;border-bottom: 1px solid #ddd;font-size: 14px;
    .label {
      font-weight: bold;
    }
  }
}
</style>

<script>
import { Transaction } from 'ethereumjs-tx'
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
      network: localStorage.getItem('network')
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
    // console.log(this.$$.web3)
    this.$$.isConnected().then(res => {
      this.initData()
    }).catch(err => {
      this.$notify('节点连接失败！')
    })
  },
  methods: {
    close () {
      this.$store.commit('setKeystore', {info: ''})
      this.$store.commit('setAddress', {info: ''})
      this.$router.push('/enter')
    },
    initData () {
      const batch = new this.$$.web3.BatchRequest()

      batch.add(this.$$.web3.fsn.getAllBalances.request( this.address, 'latest', (err, res) => {
        if (err) {
          this.balanceData = 0
          this.fsnBalance = 0
        } else {
          this.balanceData = res
          this.fsnBalance = this.$$.web3.utils.fromWei(res[this.fsnId], 'ether')
        }
      }))
      batch.add(this.$$.web3.fsn.getAllTimeLockBalances.request(this.address, 'latest', (err, res) => {
        if (err) {
          console.log(err)
          this.timelockData = []
        } else {
          this.timelockData = res
          this.timelockData = this.timelockData[this.fsnId] && this.timelockData[this.fsnId].Items ? this.timelockData[this.fsnId].Items : []
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
        name = '	FUSION (FSN) '
      } else if (addr === '0xf4798cc45b0fe0c6a27255745f6977166619bf9615d5d25a0f086e6fb24756aa') {
        name = 'Vote1 (Vote1)'
      } else {
        name = addr
      }
      return name
    }
  }
}
</script>