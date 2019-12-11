<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: 'app',
  // components: {
  //   HelloWorld
  // }
  mounted () {
    // this.initData()
  },
  methods: {
    // ...mapActions(['getAddress', 'getKeystore']),
    // initData () {
    //   this.getAddress()
    //   this.getKeystore()
    // }
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
