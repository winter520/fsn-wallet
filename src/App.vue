<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
    <input type="text" class="input-text WW100 font12 center" v-model="updateUrl" style="height:0;opacity: 0;position:fixed;top:-100px;" readonly id="copyAddress">
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
import {methods, data} from '@/assets/js/update/index.js'
export default {
  name: 'app',
  data () {
    return {
      ...data
    }
  },
  // components: {
  //   HelloWorld
  // }
  mounted () {
    this.update()
  },
  methods: {
    ...methods,
    versionTip (data) {
      let oneDay = 1000 * 60 * 60 * 24
      let versionTipTime = localStorage.getItem('versionTime') ? Number(localStorage.getItem('versionTime')) : 0
      versionTipTime = Date.now() - versionTipTime
      if ((Number(data.level) === 2 || Number(data.level) === 3) && versionTipTime > oneDay) {
        this.versionTipMust(data)
      } else if (versionTipTime > oneDay) {
        this.versionTipNoMust(data)
      }
    },
    latestVersionTip () {}
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  /* margin-top: 60px; */
}
</style>
