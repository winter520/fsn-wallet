<template>
  <div>
    <form action="/">
     <van-search
        v-model="searchVal"
        show-action
        :placeholder="$t('tip').tip3"
        @search="onSearch"
        @cancel="onCancel"
      >
        <div slot="action" @click="onCancel">{{$t('btn').cancel}}</div>
     </van-search>
    </form>

    <div>
      <!-- <addrInfo :searchVal="searchVal" v-if="searchType.a"></addrInfo> -->
      <block :searchVal="searchVal" v-if="searchType.b"></block>
      <txns :searchVal="searchVal" v-if="searchType.t"></txns>
    </div>
  </div>
</template>

<style>

</style>

<script>
// import addrInfo from './addrInfo.vue'
import block from './block.vue'
import txns from './txns.vue'
export default {
  name: 'search',
  data () {
    return {
      searchVal: '',
      searchType: {
        a: 0,
        b: 0,
        t: 0
      }
    }
  },
  components: {block, txns},
  mounted () {
    this.$$.web3.fsn.getAddressByNotation(3633, 'latest')
  },
  methods: {
    onSearch(val) {
      // console.log(val)
      this.search()
    },
    onCancel () {
      // Toast('取消')
      this.searchVal = ''
      this.searchType = {
        a: 0,
        b: 0,
        t: 0
      }
    },
    search () {
      if (this.searchVal !== '') {
        if (!isNaN(this.searchVal) && this.searchVal.indexOf('0x') !== 0) {
          this.searchType.b = 1
        } else {
          this.searchType.t = 1
        }
      } else {
        this.onCancel()
      }
    }
  }
}
</script>