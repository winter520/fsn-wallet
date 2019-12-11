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
              <span>{{$$.thousandBit($$.web3.fromWei(balanceData[fsnId], 'ether'), 8)}}</span>
            </li>
            <li class="WW100 item flex-sc font12">
              <span>地址：</span>
              <span>{{address}}</span>
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
                  <span class="label">ASSET NAME：</span>{{formatAddr(index)}}
                </p>
                <div class="flex-bc">
                  <p class="WW50 flex-sc"><span class="label">ID：</span>{{$$.cutOut(index, 8, 6)}}</p>
                  <p class="WW50 flex-sc"><span class="label">AVAILABLE：</span>{{$$.thousandBit($$.web3.fromWei(item, 'ether'), 3)}}</p>
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
                  <span class="label">AMOUNT：</span>{{$$.thousandBit($$.web3.fromWei(item.Value, 'ether'), 3)}}
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
  </div>
</template>

<style lang="scss">
.top-box {
  width: 100%;padding:10px 15px;
  .top-bg {
    width: 100%;padding:10px 15px;background: #0099ff;border-radius: 5px;position:relative;
    .close {
      position: absolute;top:10px;right: 15px;color:#fff;font-size: 14px;
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
export default {
  name: 'account',
  data () {
    return {
      loading: false,
      finished: false,
      activeName: 'a',
      balanceData: [],
      timelockData: [],
      addrNode: 0,
      fsnId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
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
    setTimeout(() => {
      this.initData()
    }, 300)

  },
  methods: {
    close () {
      this.$store.commit('setKeystore', {info: ''})
      this.$store.commit('setAddress', {info: ''})
      this.$router.push('/enter')
    },
    initData () {
      this.balanceData = this.$$.web3.fsn.getAllBalances( this.address, 'latest')
      this.timelockData = this.$$.web3.fsn.getAllTimeLockBalances(this.address, 'latest')
      this.timelockData = this.timelockData[this.fsnId] && this.timelockData[this.fsnId].Items ? this.timelockData[this.fsnId].Items : []
      // console.log(this.balanceData)
      // console.log(this.timelockData)
      this.addrNode = this.$$.web3.fsn.getNotation(this.address, 'latest')
      this.loading = true
      this.finished = true
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