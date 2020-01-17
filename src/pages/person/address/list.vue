<template>
  <div class="boxConntent1">
    <van-button type="primary" size="large" @click="toUrl('/person/address/add')">新增地址</van-button>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="a-list-box">
        <ul>
          <li class="item flex-bc" v-for="(item, index) in addressArr" :key="index" @click="toUrl('/person/address/edit', item)">
            <span class="flex-sc left"><van-icon name="location-o" class="font18 mr-5" /><i class="addr">{{item.address}}</i></span>
            <van-icon name="arrow" />
          </li>
        </ul>
      </div>
    </van-list>
  </div>
</template>

<style lang="scss" scoped>
.a-list-box {
  background: #fff;
  .item {
    padding: 12px 10px;border-bottom: 1px solid #eee;font-size: 14px;color: #333333;cursor: pointer;
    .left {
      width: 100%;
      .addr {
        width: 80%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;
      }
    }
  }
}
</style>

<script>

export default {
  name: 'addressList',
  data () {
    return {
      addressArr: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    addrList () {
      return this.$store.state.addressObj
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      console.log(this.addrList)
      for (let addr in this.addrList) {
        this.addressArr.push({
          address: addr,
          name: this.addrList[addr]
        })
      }
      this.loading = true
      this.finished = true
    }
  }
}
</script>