import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
    keystore: localStorage.getItem('keystore') ? localStorage.getItem('keystore') : ''
  },
  mutations: {
    setAddress (state, data) {
      let info = data.info ? data.info : ''
      state.address = info
      if (!data.type) {
        // cookie.setCookie('address', info)
        localStorage.setItem('address', info)
      }
    },
    setKeystore (state, data) {
      let info = data.info ? data.info : ''
      state.keystore = info
      if (!data.type) {
        // cookie.setCookie('keystore', info)
        localStorage.setItem('keystore', info)
      }
    },
  },
  actions: {
    // getAddress ({commit}) {
    //   // console.log(cookie.getCookie('address'))
    //   // let data = { type: 1, info: cookie.getCookie('address')}
    //   let data = { type: 1, info: localStorage.getItem('address')}
    //   commit('setAddress', data)
    // },
    // getKeystore ({commit}) {
    //   // console.log(cookie.getCookie('keystore'))
    //   // let data = { type: 1, info: cookie.getCookie('keystore')}
    //   let data = { type: 1, info: localStorage.getItem('keystore')}
    //   commit('setKeystore', data)
    // }
  }
})

export default store
