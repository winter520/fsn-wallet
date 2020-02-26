<template>
  <div>
    <ul class="info-list">
      <li v-for="(item, index) in searchRes" :key="index" class="item">
        <p class="label">{{index}}:</p>
        <p class="cont">{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.info-list {
  width: 100%;
  .item {
    width: 100%;font-size:12px;line-height:20px;border-bottom: 1px solid #ddd;text-align: left;padding:5px 15px;
    .label {
      font-weight: bold;
    }
    .cont {
      word-break: break-all;
    }
  }
}
</style>

<script>
export default {
  name: 'block',
  props: ['searchVal'],
  data () {
    return {
      searchRes: ''
    }
  },
  watch: {
    searchVal (cur) {
      // console.log(cur)
      this.getBlock()
    }
  },
  mounted () {
    this.getBlock()
  },
  methods: {
    getBlock () {
      this.$$.web3.eth.getBlock(this.searchVal).then(res => {
        // console.log(res)
        this.searchRes = res
      }).catch(err => {
        this.$notify(err.toString())
      })
    },
  }
}
</script>