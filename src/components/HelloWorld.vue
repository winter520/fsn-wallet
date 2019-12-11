<template>
  <div class="hello">
    <van-button type="default">默认按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    // console.log(this.$$)
    console.log(this.$$.web3)
    console.log(this.$$.web3.isConnected())
    // this.$$.web3.fsn.allAssets(res => {
    //   console.log(res)
    // })
    // this.$$.web3.fsn.getAsset(res => {
    //   console.log(res)
    // })
    // console.log(this.$$.web3.fsn.getBalance('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', '0x9c48c796cb0bed51a14291bc8cc56dab5aed7b5c'))
    console.log(this.$$.web3.fsn.getAddressByNotation(Number(6215558), "latest"))
    console.log(this.$$.web3.fsn.getBalance("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", "0x89fa3626bd0ae6e86d558a866f6044790ace8fd2", 'latest'))
    console.log(this.$$.web3.fsn.getAllTimeLockBalances("0x89fa3626bd0ae6e86d558a866f6044790ace8fd2", 'latest'))
    // console.log(this.$$.web3.fsn.allAssets())
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
