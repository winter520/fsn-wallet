import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

let ksArr = {}
if (localStorage.getItem('keystoreObj')) {
  ksArr = JSON.parse(localStorage.getItem('keystoreObj'))
} 

const store = new Vuex.Store({
  state: {
    address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
    keystore: localStorage.getItem('keystore') ? localStorage.getItem('keystore') : '',
    keystoreObj: ksArr,
  },
  mutations: {
    setAddress (state, data) {
      let info = data.info ? data.info : ''
      state.address = info
      if (!data.type) {
        localStorage.setItem('address', info)
      }
    },
    setKeystore (state, data) {
      let info = data.info ? data.info : ''
      state.keystore = info
      if (!data.type) {
        localStorage.setItem('keystore', info)
      }
    },
    setKeystoreObj (state, data) {
      state.keystoreObj[data.key] = data.value
      if (!data.type) {
        localStorage.setItem('keystoreObj', JSON.stringify(state.keystoreObj))
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
