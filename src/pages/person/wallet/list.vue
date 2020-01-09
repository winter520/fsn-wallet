<template>
  <div class="boxConntent1">
    <wallet-account @on-wallet="toWallet"></wallet-account>
  </div>
</template>

<style lang="scss">

</style>

<script>
import walletAccount from '@c/account/index.vue'
export default {
  name: 'wallet',
  data () {
    return {
    }
  },
  components: {walletAccount},
  mounted () {
  },
  methods: {
    toWallet (data) {
      this.toUrl('/person/wallet/dtil', data)
    }
  }
}
</script>