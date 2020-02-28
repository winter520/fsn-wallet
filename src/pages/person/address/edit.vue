<template>
  <div class="boxConntent1">
    <div class="form-box HH100 pt-30">
      <ul class="ul">
        <li class="item">
          <label class="label">{{$t('label').remark}}:</label>
          <div class="input-box">
            <input type="text" v-model="addressObj.name" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item">
          <label class="label">{{$t('label').address}}:</label>
          <div class="input-box">
            <input type="text" v-model="addressObj.address" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item flex-bc">
          <van-button type="info" @click="handleClick" class="WW50 btn-yellow">{{$t('btn').edit}}</van-button>
          <van-button type="danger" @click="removeKs" class="WW50 btn-radius ml-15">{{$t('btn').del}}</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
// body {
//   background: $bg-color
// }
</style>

<script>

export default {
  name: 'addressEdit',
  data () {
    return {
      addressObj: {}
    }
  },
  mounted () {
    // console.log(this.$route)
    this.initData()
  },
  methods: {
    initData () {
      this.addressObj = this.$route.query
    },
    removeKs () {
      this.$dialog.confirm({
        title: this.$t('warn').w_9,
        message: this.$t('warn').w_10 + this.addressObj.address
      }).then(res => {
        console.log(res)
        this.$store.commit('setRemoveAddress', this.addressObj.address)
        this.$notify({ type: 'success', message: this.$t('success').s_2 })
        this.toUrl('/person/address')
      }).catch(err => {
        console.log(err)
      })
    },
    handleClick () {
      if (!this.addressObj.address || !this.$$.web3.utils.checkAddressChecksum(this.addressObj.address)) {
        this.$notify(this.$t('error').e_3)
        return
      }
      this.$store.commit('setAddressObj', {
        key: this.addressObj.address,
        value: this.addressObj.name
      })
      this.toUrl('/person/address')
    }
  }
}
</script>