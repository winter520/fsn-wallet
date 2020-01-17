<template>
  <div class="boxConntent1">
    <div class="form-box HH100 pt-30">
      <ul class="ul">
        <li class="item">
          <label class="label">备注:</label>
          <div class="input-box">
            <input type="text" v-model="addressObj.name" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item">
          <label class="label">地址:</label>
          <div class="input-box">
            <input type="text" v-model="addressObj.address" class="input-text HH100 WW100">
          </div>
        </li>
        <li class="item">
          <van-button type="info" @click="handleClick" class="WW100">增加</van-button>
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
        this.$notify('地址错误，请重新填写！')
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