<template>
  <div class="bgContent">
    <div class="e-box">
      <div class="W90 flex-c" style="margin:0 auto 30px">
        <img src="@/assets/img/logo/logo2.png" class="WW100">
      </div>
      <!-- <div class="flex-c mb-20 color_99">
        FUSION Wallet
      </div> -->
      <van-button type="primary" @click="toUrl('/register')" class="btn-yellow">{{$t('btn').createWt}}</van-button>
      <van-button type="info" @click="toUrl('/login')" class="ml-10 btn-radius">{{$t('btn').importWt}}</van-button>
      <!-- <set-node></set-node> -->
    </div>
  </div>
</template>

<style>
.e-box {padding: 25% 0 50px;width: 190px;margin: auto;}
</style>

<script>
import setNode from '@c/setNode/index'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {setNode},
  mounted () {
  },
  methods: {
  }
}
</script>