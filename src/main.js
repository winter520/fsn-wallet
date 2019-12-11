import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/css.css'

import $$ from '@/libs/$$.js'

import { 
  Button,
  Uploader,
  NavBar,
  Tab,
  Tabs,
  Notify,
  List,
  Cell,
  CellGroup,
  DatetimePicker,
  Popup,
  Icon
} from 'vant'

Vue.use(Button)
Vue.use(Uploader)
Vue.use(NavBar)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Notify)
Vue.use(List)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(DatetimePicker)
Vue.use(Popup)
Vue.use(Icon)


Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$$ = $$
Vue.prototype.toUrl = function(url, params) {
  this.$router.push({path: url, query: params})
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
