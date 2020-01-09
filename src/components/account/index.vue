<template>
  <div class="boxConntent1">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="w-list-box">
        <ul class="WW100">
          <li class="item flex-bc" v-for="(item, index) in walletArr" :key="index" @click="hangleClick(item)">
            <span class="flex-sc left"><van-icon name="paid" class="font18 mr-5" /><i class="addr">{{item.address}}</i></span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.w-list-box {
  background: #fff;
  .item {
    width: 100%;padding: 12px 5px;border-bottom: 1px solid #eee;font-size: 14px;color: #333333;cursor: pointer;
    .left {
      width: 80%;
      .addr {
        width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
      }
    }
  }
}
</style>

<script>

export default {
  name: 'wallet',
  data () {
    return {
      walletArr: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    wList () {
      return this.$store.state.keystoreObj
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      console.log(this.wList)
      for (let addr in this.wList) {
        this.walletArr.push({
          address: addr,
          ks: this.wList[addr]
        })
      }
      this.loading = true
      this.finished = true
    },
    hangleClick (item) {
      this.$emit('on-wallet', item)
    }
  }
}
</script>