<template>
  <div class="p-box">
    <div class="p-header-box">
      <div class="W50 flex-c logo" style="margin:0 auto 10px">
        <img src="@/assets/img/logo/logo0.png" class="WW100">
      </div>
      <!-- <div class="flex-c"> Gwhale Wallet </div> -->
      <div class="flex-c"> {{$t('title').appTitle}} </div>
      <p class="flex-c font12">{{$t('tip').tip2}}</p>
    </div>
    <div class="p-list-box">
      <ul>
        <li class="item flex-bc" @click="toUrl('/person/wallet')">
          <span class="flex-c"><van-icon name="paid" class="font18 mr-10"/>{{$t('nav').wtManger}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc" @click="toUrl('/person/address')">
          <span class="flex-c"><van-icon name="location-o" class="font18 mr-10" />{{$t('nav').addrManger}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc" @click="toUrl('/person/node')">
          <span class="flex-c"><van-icon name="aim" class="font18 mr-10" />{{$t('nav').nodeManger}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc" @click="toUrl('/person/set')">
          <span class="flex-c"><van-icon name="setting-o" class="font18 mr-10" />{{$t('nav').set}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc mt-15" @click="toUrl('/login')">
          <span class="flex-c"><van-icon name="peer-pay" class="font18 mr-10" />{{$t('btn').importWt}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc" @click="toUrl('/register')">
          <span class="flex-c"><van-icon name="share" class="font18 mr-10" />{{$t('btn').createWt}}</span>
          <van-icon name="arrow" />
        </li>
        <li class="item flex-bc mt-15" @click="update">
          <span class="flex-c"><van-icon name="replay" class="font18 mr-10" />{{$t('nav').update}}</span>
          <van-icon name="arrow" />
        </li>
      </ul>
    </div>
    <!-- <input type="text" class="input-text H30 WW100 font12 center" v-model="updateUrl" style="opacity: 0" id="copyAddress"> -->
  </div>
</template>

<style lang="scss" scoped>
.p-box {
  width: 100%;height: 100%;background: #eee;padding-bottom: 50px;
}
.p-header-box {
  width: 100%;height: 180px;padding:35px 15px 15px;background: url('~@/assets/img/bg/topBg.png') no-repeat center; background-size: 100% 100%;position:relative;
  .logo {
    width: 60px;height: 60px;margin: 20px auto 10px;background: #9b9188;border-radius: 100%;padding: 12px;
  }
}
.p-list-box {
  margin-top: 15px;
  .item {
    padding: 12px 15px;border-bottom: 1px solid #eee;font-size: 14px;color: #333333;cursor: pointer;background: #fff;
  }
}
</style>

<script>
import {methods, data} from '@/assets/js/update/index.js'
export default {
  name: 'person',
  data () {
    return {
      ...data
    }
  },
  mounted () {

  },
  methods: {
    ...methods,
    versionTip (data) {
      if (Number(data.level) === 1) {
        this.versionTipNoMust(data)
      } else {
        this.versionTipMust(data)
      }
    },
    latestVersionTip () {
      this.$dialog.alert({
        title: this.$t('tip').havingVersion,
        message: this.$t('tip').nowVersion + '：' + this.$$.version
      }).then(() => {
        // on close
      })
    },
  }
}
</script>