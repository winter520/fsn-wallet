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
        <li class="item">
          <van-button type="info" @click="handleClick" class="WW100 btn-yellow">{{$t('btn').newAdd}}</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
// 
</style>

<script>

export default {
  name: 'addressAdd',
  data () {
    return {
      addressObj: {}
    }
  },
  mounted () {

  },
  methods: {
    handleClick () {
      if (!this.addressObj.address || !this.$$.web3.utils.isAddress(this.addressObj.address)) {
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