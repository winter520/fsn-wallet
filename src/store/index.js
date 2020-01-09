import Vue from 'vue'
import Vuex from 'vuex'

// import cookie from '@/libs/cookie'

Vue.use(Vuex)

let ksArr = {}, addressObj = {}
if (localStorage.getItem('keystoreObj')) {
  ksArr = JSON.parse(localStorage.getItem('keystoreObj'))
}
if (localStorage.getItem('addressObj')) {
  addressObj = JSON.parse(localStorage.getItem('addressObj'))
} 

const store = new Vuex.Store({
  state: {
    address: localStorage.getItem('address') ? localStorage.getItem('address') : '',
    keystore: localStorage.getItem('keystore') ? localStorage.getItem('keystore') : '',
    keystoreObj: ksArr,
    addressObj: addressObj
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
    setRemoveKeystore (state, data) {
      delete state.keystoreObj[data]
      if (!data.type) {
        localStorage.setItem('keystoreObj', JSON.stringify(state.keystoreObj))
      }
    },
    setAddressObj (state, data) {
      console.log(data)
      state.addressObj[data.key] = data.value ? data.value : data.key
      if (!data.type) {
        localStorage.setItem('addressObj', JSON.stringify(state.addressObj))
      }
    },
    setRemoveAddress (state, data) {
      delete state.addressObj[data]
      if (!data.type) {
        localStorage.setItem('addressObj', JSON.stringify(state.addressObj))
      }
    },
  },
})

export default store
